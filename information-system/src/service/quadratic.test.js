const taskTypes = require('../model/taskTypes');
const taskStates = require('../model/taskStates');

describe('Test Quadratic Equation Solver Services', () => {
  describe('Invalid Configuration', () => {
    const service = require('./quadratic');
    it('expects rejection if ai is not configured', () => {
      // given
      // when
      expect.assertions(1);
      service.solveSync(1, 2, 1)
        .catch((err) => {
          expect(err).not.toBeNull();
        });
      // then
    });
  });

  describe('Valid Configuration', () => {
    const VALID_CONFIG = {
      ai: {
        host: '123.123.123.123',
        port: 1234
      }
    };

    beforeEach(() => {
      jest.resetModules();
      jest.resetAllMocks();
    });

    it('perform calculation properly', async () => {
      // given
      const service = require('./quadratic');
      const config = VALID_CONFIG;
      jest.mock('../config', () => {
        return config;
      });
      jest.mock('axios');
      const axios = require('axios');
      axios.get.mockResolvedValue({
        data: {
          discriminant: 0,
          solution: [-2]
        }
      });
      jest.mock('../model/Task');
      const Task = require('../model/Task');
      Task.create.mockImplementation(() => {
        Promise.resolve();
      });
      const EXPECTED_TASK = {
        type: taskTypes.SYNC,
        status: taskStates.COMPLETED
      };
      // when
      await service.solveSync(1, 2, 1);
      // then
      expect(axios.get).toHaveBeenCalled();
      expect(Task.create).toHaveBeenCalled();
      expect(Task.create.mock.calls[0][0]).toMatchObject(EXPECTED_TASK);
    });

    it('perform calculation with communication error', async () => {
      // TODO: #17
    });

    it('notifies an async task successfully', async () => {
      // given
      jest.mock('../model/Task');
      const Task = require('../model/Task');
      const taskInprogress = {
        _id: '601aed3d6acb4f2aaa6e6610',
        status: taskStates.IN_PROGRESS,
        type: taskTypes.ASYNC
      };
      const updatedTask = {
        ...taskInprogress,
        status: taskStates.COMPLETED
      };
      Task.findById.mockImplementation(() => {
        return {
          exec: jest.fn(() => {
            return taskInprogress;
          })
        };
      });
      Task.findByIdAndUpdate.mockReturnValue(updatedTask);

      const service = require('./quadratic');
      // when

      await service.handleAsyncNotification(taskInprogress._id, {});
      // then

      expect(Task.findById).toHaveBeenCalled();
      expect(Task.findByIdAndUpdate).toHaveBeenCalled();
    });

    it('notifies an async task successfully which is not in progress state', async () => {
      // given
      jest.mock('../model/Task');
      const Task = require('../model/Task');
      const taskInprogress = {
        _id: '601aed3d6acb4f2aaa6e6610',
        status: taskStates.COMPLETED,
        type: taskTypes.ASYNC
      };
      Task.findById.mockImplementation(() => {
        return {
          exec: jest.fn(() => {
            return taskInprogress;
          })
        };
      });
      const service = require('./quadratic');
      // when
      try {
        await service.handleAsyncNotification(taskInprogress._id, {});
      } catch (err) {
        expect(err).not.toBeNull();
      }
      // then
      expect(Task.findById).toHaveBeenCalled();
    });

    it('notifies an async task successfully which is not async', async () => {
      // given
      jest.mock('../model/Task');
      const Task = require('../model/Task');
      const taskInprogress = {
        _id: '601aed3d6acb4f2aaa6e6610',
        status: taskStates.IN_PROGRESS,
        type: taskTypes.SYNC
      };
      Task.findById.mockImplementation(() => {
        return {
          exec: jest.fn(() => {
            return taskInprogress;
          })
        };
      });
      const service = require('./quadratic');
      // when
      try {
        await service.handleAsyncNotification(taskInprogress._id, {});
      } catch (err) {
        expect(err).not.toBeNull();
      }
      // then
      expect(Task.findById).toHaveBeenCalled();
    });

    it('notifies an async task successfully which is not fount', async () => {
      // given
      jest.mock('../model/Task');
      const Task = require('../model/Task');
      Task.findById.mockImplementation(() => {
        return {
          exec: jest.fn(() => {
            return null;
          })
        };
      });
      const service = require('./quadratic');
      // when
      try {
        await service.handleAsyncNotification('id', {});
      } catch (err) {
        expect(err).not.toBeNull();
      }
      // then
      expect(Task.findById).toHaveBeenCalled();
    });
  });
});
