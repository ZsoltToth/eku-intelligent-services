"""Servlets to solve the quadratic equation"""

from threading import Thread
import time
from flask import request, Blueprint
import requests
import quadratic_service
import config

quadratic_api = Blueprint('quadratic_api', __name__)


@quadratic_api.route('/qe/solve', methods=['GET'])
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
            return {"message": "At least a parameter is not a number"}, 406
        if coeff_a == 0:
            return {"message": "It is linear"}, 406
    else:
        return {"message": "Missing parameter"}, 406
    return quadratic_service.solve_quadratic(coeff_a, coeff_b, coeff_c), 200


@quadratic_api.route('/qe/async/solve', methods=['POST'])
def async_quadratic():
    """Returns the acceptance of the async quadratic equation solver task"""
    if not request.is_json:
        return {"message": "Wrong format"}, 406
    content = request.get_json()
    print(content)
    if len(content.get("payload")) == 3:
        arg_a = content.get("payload")[0]
        arg_b = content.get("payload")[1]
        arg_c = content.get("payload")[2]
        try:
            coeff_a = float(arg_a)
            coeff_b = float(arg_b)
            coeff_c = float(arg_c)
        except ValueError:
            return {"message": "At least a payload element is not a number"}, 406
        if coeff_a == 0:
            return {"message": "It is linear"}, 406
    else:
        return {"message": "Wrong number of parameters"}, 406
    if "taskId" not in content:
        return {"message": "Missing taskId"}, 406
    task_id = content.get("taskId")
    thread = Thread(target=notify_result, args=(task_id, coeff_a, coeff_b, coeff_c))
    thread.daemon = True
    thread.start()
    return {"message": "OK"}, 200


def notify_result(task_id, coeff_a, coeff_b, coeff_c):
    """Notify the information system about the solved quadratic equation."""
    payload = quadratic_service.solve_quadratic(coeff_a, coeff_b, coeff_c)
    delay = int(config.__get_delay())  # pylint: disable=W0212
    host = config.__get_is_host()  # pylint: disable=W0212
    port = config.__get_is_port()  # pylint: disable=W0212
    for i in range(delay):
        print("Working... {}/{}".format(i + 1, delay))
        time.sleep(1)
    requests.post('http://' + host + ":" + port + "/qe/async/notify/" + task_id, json=payload)
    print("Thread Finished :")
