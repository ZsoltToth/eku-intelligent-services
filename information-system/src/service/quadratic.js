const winston = require('winston');
const axios = require('axios');
const { ai } = require('../config');
const Task = require('../model/Task');
const TaskTypes = require('../model/taskTypes');
const TaskStates = require('../model/taskStates');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/service.log'
    }),
    new winston.transports.Console()
  ]
});

const isAiConnectionConfigured = () => {
  return ai.host !== null && ai.port > 0;
};

const solveSync = (a, b, c) => {
  return new Promise((resolve, reject) => {
    if (!isAiConnectionConfigured()) {
      logger.error({ message: 'AI Connection is not Configured' });
      reject(new Error({ message: 'AI Connection is not Configured' }));
      return;
    }
    logger.info('Solve QE Synchronously');
    const syncRequestUrl = `http://${ai.host}:${ai.port}/qe/solve`;
    axios.get(syncRequestUrl, {
      params: {
        a: a,
        b: b,
        c: c
      }
    })
      .then((resp) => {
        logger.info({
          status: resp.status,
          statusText: resp.statusText,
          data: resp.data
        });
        Task.create({
          type: TaskTypes.SYNC,
          status: TaskStates.COMPLETED,
          coeffs: [a, b, c],
          solution: {
            discriminant: resp.data.discriminant,
            roots: resp.data.solution
          }
        });
        resolve(resp.data);
      })
      .catch(err => {
        logger.error({
          message: err,
          type: 'Communication Error!'
        });
        Task.create({
          type: TaskTypes.SYNC,
          status: TaskStates.FAILED,
          coeffs: [a, b, c],
          errorMessage: err.toString()
        })
          .then((doc) => {
            logger.info(doc);
          })
          .catch(error => {
            logger.error({
              error: 'Database Error!',
              message: error
            });
          });
        reject(err);
      });
  });
};

const isTaskAsyncAndInProgress = (task) => {
  if (task === null) {
    return false;
  }
  if (task.type !== TaskTypes.ASYNC) {
    return false;
  }
  if (task.status !== TaskStates.IN_PROGRESS) {
    return false;
  }
  return true;
};

const handleAsyncNotification = async (taskId, solution) => {
  console.log({
    taskId: taskId,
    solution: solution
  });
  try {
    const task = await Task.findById(taskId).exec();
    console.log({ task: task });
    if (!isTaskAsyncAndInProgress(task)) {
      throw new Error(`Task (${taskId}) is invalid state: ${task.type} ${task.status}`);
    }
    return await Task.findByIdAndUpdate({ _id: taskId }, {
      status: TaskStates.COMPLETED,
      solution: {
        discriminant: solution.discriminant,
        roots: solution.solution
      },
      lastUpdate: Date.now()
    });
  } catch (err) {
    console.log({ error: err });
    return err;
  }
};

const _initializeAsyncTask = async (a, b, c) => {
  try {
    const task = await Task.create({
      type: TaskTypes.ASYNC,
      status: TaskStates.INITIALIZED,
      coeffs: [a, b, c]
    });
    return task._id;
  } catch (err) {
    logger.error(err);
  }
};

const _changeTaskToInProgress = async (taskId) => {
  await Task.findByIdAndUpdate({ _id: taskId }, {
    status: TaskStates.IN_PROGRESS,
    lastUpdate: Date.now()
  });
};

const _failTask = async (taskId, reason) => {
  await Task.findByIdAndUpdate({ _id: taskId }, {
    status: TaskStates.FAILED,
    lastUpdate: Date.now(),
    errorMessage: reason
  });
};

const _startAsyncServiceOnIntelligenceServer = async (taskId, coeffs) => {
  if (!isAiConnectionConfigured()) {
    logger.error({ message: 'AI Connection is not Configured' });
    throw Error('AI Connection is not Configured');
  }
  logger.info('Start Async QE Solver on Artificial Intelligence Service');
  const asyncRequestUrl = `http://${ai.host}:${ai.port}/qe/async/solve`;
  await axios.post(asyncRequestUrl, {
    taskId: taskId,
    payload: coeffs
  });
};

const solveAsync = async ({
  a,
  b,
  c
}) => {
  const taskId = await _initializeAsyncTask(a, b, c);
  try {
    await _startAsyncServiceOnIntelligenceServer(taskId, [a, b, c]);
    await _changeTaskToInProgress(taskId);
  } catch (err) {
    logger.error(err);
    _failTask(taskId, err);
    throw Error(`Task Initialization Failed ${taskId}`);
  }
  return taskId;
};

module.exports = {
  solveSync: solveSync,
  handleAsyncNotification: handleAsyncNotification,
  solveAsync: solveAsync
};
