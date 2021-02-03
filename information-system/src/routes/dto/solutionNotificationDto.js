const {
  body,
  param
} = require('express-validator');

const mongoose = require('mongoose');

module.exports = [
  param('id', 'Task Id must be specified as a path variable').exists(),
  param('id', 'Task Id must be ObjectId').custom((id) => mongoose.Types.ObjectId.isValid(id)),
  body('discriminant', 'Discriminant must be calculated').exists(),
  body('solution', 'Solution must be a double array').exists(),
  body('solution', 'Solution must be a double array').custom((solution) => {
    return Array.isArray(solution) && solution.reduce((acc, cur) => acc && Number.isFinite(cur), true);
  })
]
;
