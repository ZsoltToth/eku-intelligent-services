const {
  param
} = require('express-validator');

const mongoose = require('mongoose');

module.exports = [
  param('taskId', 'Task Id must be specified as a path variable').exists(),
  param('taskId', 'Task Id must be ObjectId').custom((id) => mongoose.Types.ObjectId.isValid(id))
]
;
