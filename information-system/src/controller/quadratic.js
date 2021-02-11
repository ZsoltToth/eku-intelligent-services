const { validationResult } = require('express-validator');
const service = require('../service/quadratic');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/controller.log'
    }),
    new winston.transports.Console()
  ]
});

exports.solveSync = (req, res) => {
  if (req.query.a === undefined) {
    res.status(400).send();
    return;
  }
  if (req.query.b === undefined) {
    res.status(400).send();
    return;
  }
  if (req.query.c === undefined) {
    res.status(400).send();
    return;
  }
  service.solveSync(req.query.a, req.query.b, req.query.c)
    .then((solution) => res.status(200).send(solution))
    .catch((err) => {
      logger.error(err);
      res.status(500).send(err);
    });
};

exports.asyncNotification = (req, res) => {
  if (!validationResult(req).isEmpty()) {
    logger.error({ validationErrors: validationResult(req) });
    res.status(400).send(validationResult(req));
    return;
  }
  service.handleAsyncNotification(req.params.id, req.body)
    .then(() => {
      res.status(200).send();
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.solveAsync = (req, res) => {
  if (!validationResult(req).isEmpty()) {
    logger.error({ validationErrors: validationResult(req) });
    res.status(400).send(validationResult(req));
    return;
  }
  service.solveAsync(req.body)
    .then((taskId) => {
      res.status(200).send(taskId);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.queryTaskById = (req, res) => {
  if (!validationResult(req).isEmpty()) {
    logger.error({ validationErrors: validationResult(req) });
    res.status(400).send(validationResult(req));
    return;
  }
  service.queryTaskById(req.params.taskId)
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
