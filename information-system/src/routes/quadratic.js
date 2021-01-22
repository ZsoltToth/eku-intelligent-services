const express = require('express');
const router = express.Router();
const controller = require('../controller/quadratic');

/**
 * @swagger
 * /qe/sync/solve:
 *  get:
 *      summary: Solve a Quadratic Equation Synchronously
 *      parameters:
 *        - in: query
 *          name: a
 *          type: number
 *          required: true
 *          description: description of parameter
 *        - in: query
 *          name: b
 *          type: number
 *          required: true
 *          description: description of parameter
 *        - in: query
 *          name: c
 *          type: number
 *          required: true
 *          description: description of parameter
 *      responses:
 *          200:
 *              description: list of issues
 *          400:
 *              description: query parameter is misssing
 */
router.get('/sync/solve', controller.solveSync);

module.exports = router;
