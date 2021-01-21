import flask
from flask import request, jsonify, Response
import quadraticService

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['JSON_SORT_KEYS'] = False

@app.route('/qe/solve', methods=['GET'])
def quadratic():
    if 'a' in request.args and 'b' in request.args and 'c' in request.args:
        arg_a = request.args['a']
        arg_b = request.args['b']
        arg_c = request.args['c']
        try:
            a = float(arg_a)
            b = float(arg_b)
            c = float(arg_c)
        except:
            return {"message":"At least a parameter is not a number"},406
        if a == 0:
            return {"message":"It is linear"}, 406

    else:
        return {"message":"Missing parameter"}, 406
    return quadraticService.solve_quadratic(a, b, c), 200


app.run()
