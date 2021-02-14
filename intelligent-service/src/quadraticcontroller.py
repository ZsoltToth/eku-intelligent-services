"""Servlets to solve the quadratic equation"""

from flask import request, Blueprint

import quadratic_service

quadratic_api = Blueprint('quadratic_api', __name__)


@quadratic_api.route('/qe/solve', methods=['GET'])
def quadratic():
    """
    Returns the solution and the discriminant of the quadratic equation.
    The quadratic equation described by a, b and c parameters
    ---
    parameters:
        -   in : query
            name : a
            required : true,
            schema :
                type : int
        -   in : query
            name : b
            required : true,
            schema :
                type : int
        -   in : query
            name : c
            required : true,
            schema :
                type : int
    responses:
        200:
            description: Ok
            content:
                application/json:
                    schema:
                        type : object
                        properties:
                            solution:
                                type : array
                                items:
                                    type : integer
                                minItems : 0
                                maxItems: 2
                            discriminant:
                                type : numeric
        406:
            description: Wrong request
            content :
                application/json:
                    schema:
                        properties:
                            message:
                                type: string
                                description: the message
     """
    if 'a' in request.args and 'b' in request.args and 'c' in request.args:
        arg_a = request.args['a']
        arg_b = request.args['b']
        arg_c = request.args['c']
        try:
            coeff_a = float(arg_a)
            coeff_b = float(arg_b)
            coeff_c = float(arg_c)
        except ValueError:
            return {"message": "At least a parameter is not a number"}, 406
        if coeff_a == 0:
            return {"message": "It is linear"}, 406
    else:
        return {"message": "Missing parameter"}, 406
    return quadratic_service.solve_quadratic(coeff_a, coeff_b, coeff_c), 200


@quadratic_api.route('/qe/async/solve', methods=['POST'])
def async_quadratic():
    """Returns the acceptance of the async quadratic equation solver task
    ---
    definitions:
          - schema:
              id: Message
              properties:
                message:
                 type: string
                 description: the message
    parameters:
        -   in : body
            required : true
            name : body
            schema :
                type : object
                properties:
                    taskId :
                        type : string
                        example : 507f1f77bcf86cd799439011
                    payload:
                        type : array
                        items :
                            type : integer
                        minItems : 3
                        maxItems : 3
                        example: [0,0,0]
    responses:
        200:
            description: Ok
            content:
                application/json:
                    schema:
                        $ref : '#/definitions/Message'
        406:
            description: Wrong request
            content:
                application/json:
                    schema:
                        $ref: "#/definitions/Message"
    """
    try:
        task_id, [coeff_a, coeff_b, coeff_c] = _parse_async_task_request_dto(request)
    except ValueError as exception:
        return {"message": str(exception)}, 406
    quadratic_service.solve_quadratic_async(task_id, coeff_a, coeff_b, coeff_c)
    return {"message": "OK"}, 200


def _parse_async_task_request_dto(dto):
    if not dto.is_json:
        raise ValueError("Wrong format")
    content = dto.get_json()
    if len(content.get("payload")) != 3:
        raise ValueError("Missing parameter")

    arg_a = content.get("payload")[0]
    arg_b = content.get("payload")[1]
    arg_c = content.get("payload")[2]

    try:
        coeff_a = float(arg_a)
        coeff_b = float(arg_b)
        coeff_c = float(arg_c)
    except ValueError as number_exception:
        raise ValueError("At least a payload element is not a number") from number_exception
    if coeff_a == 0:
        raise ValueError("It is linear")
    if "taskId" not in content:
        raise ValueError("Missing taskId")
    task_id = content.get("taskId")
    return task_id, [coeff_a, coeff_b, coeff_c]
