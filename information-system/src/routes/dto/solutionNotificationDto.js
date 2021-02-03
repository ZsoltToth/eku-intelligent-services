const {
  body,
  param
} = require('express-validator');

module.exports = [
  param('id', 'Task Id must be specified as a path variable').exists(),
  body('discriminant', 'Discriminant must be calculated').exists(),
  body('solution', 'Solution must be a double array').exists(),
  body('solution', 'Solution must be a double array').custom((solution) => {
    return Array.isArray(solution) && solution.reduce((acc, cur) => acc && Number.isFinite(cur), true);
  })
];
