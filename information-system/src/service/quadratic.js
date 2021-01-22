const winston = require('winston');

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

const solveSync = (a, b, c) => {
  return new Promise((resolve) => {
    logger.info('Solve QE Synchronously');
    const discriminant = Math.pow(b, 2) - 4 * a * c;
    if (discriminant < 0) {
      resolve({ discriminant: discriminant });
      return;
    }
    if (discriminant === 0.0) {
      resolve({ discriminant: discriminant, solution: [(-1 * b) / (2 * a)] });
      return;
    }
    const x1 = (-1 * b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-1 * b - Math.sqrt(discriminant)) / (2 * a);
    resolve({ discriminant: discriminant, solution: [x1, x2] });
  });
};

module.exports = {
  solveSync: solveSync
};
