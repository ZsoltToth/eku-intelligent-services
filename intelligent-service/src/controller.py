"""Servelts to solve the quadratic equation"""

import flask
from flask import request
import quadratic_service

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['JSON_SORT_KEYS'] = False

@app.route('/qe/solve', methods=['GET'])
def quadratic():
    """Returns the solution and the discriminant of the quadratic equation.
     The quadratic equation described by a, b and c parameters"""
    if 'a' in request.args and 'b' in request.args and 'c' in request.args:
        arg_a = request.args['a']
        arg_b = request.args['b']
        arg_c = request.args['c']
        try:
            coeff_a = float(arg_a)
            coeff_b = float(arg_b)
            coeff_c = float(arg_c)
        except ValueError:
            return {"message":"At least a parameter is not a number"},406
        if coeff_a == 0:
            return {"message":"It is linear"}, 406

    else:
        return {"message":"Missing parameter"}, 406
    return quadratic_service.solve_quadratic(coeff_a, coeff_b, coeff_c), 200


app.run()
