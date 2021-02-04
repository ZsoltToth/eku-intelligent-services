const {
  body
} = require('express-validator');

module.exports = [
  body('a', 'The a coefficient must be a number').isNumeric(),
  body('b', 'The b coefficient must be a number').isNumeric(),
  body('c', 'The c coefficient must be a number').isNumeric()
]
;
