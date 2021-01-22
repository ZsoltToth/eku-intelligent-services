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
  service.solveSync(req.query.a, req.query.b, req.query.c).then((solution) => res.status(200).send(solution))
    .then((err) => logger.error(err));
};
