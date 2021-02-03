const express = require('express');
const router = express.Router();
const solutionNotificationDto = require('./dto/solutionNotificationDto');
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
 *              description: Solution of the Quadratic Equation
 *          400:
 *              description: query parameter is missing
 */
router.get('/sync/solve', controller.solveSync);

/**
 * @swagger
 * /qe/async/notify/{id}:
 *  post:
 *      summary: Solve a Quadratic Equation Synchronously
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: task identifier
 *      requestBody:
 *        description: solution
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                discriminant:
 *                  type: number
 *                solution:
 *                  type: array
 *                  items:
 *                    type: number
 *      responses:
 *          200:
 *              description: Successful recording of notification
 */
router.post('/async/notify/:id', solutionNotificationDto, controller.asyncNotification);
module.exports = router;
