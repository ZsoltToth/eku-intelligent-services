const express = require('express');
const router = express.Router();
const solutionNotificationDto = require('./dto/solutionNotificationDto');
const asyncQuadraticEquationRequestDto = require('./dto/asyncQuadraticEquationRequestDto');
const taskQueryRequestDto = require('./dto/taskQueryRequestDto');
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
 *      summary: Notify the system about the soulution of a QE Task
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: task identifier, ObjectID
 *          example: 507f1f77bcf86cd799439011
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

/**
 * @swagger
 * /qe/async/solve:
 *  post:
 *      summary: Solve a Quadratic Equation Asynchronously
 *      requestBody:
 *        description: coefficients
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                a:
 *                  type: number
 *                b:
 *                  type: number
 *                c:
 *                  type: number
 *      responses:
 *          200:
 *              description: Successful recording of notification
 *              content:
 *                text/plain:
 *                  schema:
 *                    type: ObjectID | String
 *                    example: 507f1f77bcf86cd799439011
 */
router.post('/async/solve', asyncQuadraticEquationRequestDto, controller.solveAsync);

/**
 * @swagger
 * /qe/async/{taskId}:
 *  get:
 *      summary: Query a task by Id
 *      parameters:
 *        - in: path
 *          name: taskId
 *          type: string
 *          required: true
 *          description: task identifier, ObjectID
 *          example: 507f1f77bcf86cd799439011
 *      responses:
 *          200:
 *              description: Task object
 */
router.get('/async/:taskId', taskQueryRequestDto, controller.queryTaskById);

module.exports = router;
