"""
Main file for server
"""
import os
import flask
from quadraticcontroller import quadratic_api
from generalcontroller import general_api


# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


def read_config():
    """Reads the environment variables, and validate them"""
    arg_port = os.environ.get('PORT')
    arg_inf_system_host = os.environ.get('IS_HOST')
    arg_inf_system_port = os.environ.get('IS_PORT')
    arg_delay = os.environ.get('DELAY')
    assert arg_port is not None, "Port is missing"
    assert arg_inf_system_host is not None, "Information system host is missing"
    assert arg_inf_system_port is not None, "Information system port is missing"
    assert arg_delay is not None, "Delay is missing"
    assert arg_port.isdigit(), "Port is not a number"
    assert arg_inf_system_port.isdigit(), "Information system port is not a number"
    assert arg_delay.isdigit(), "Delay in not a valid number"
    return arg_port, arg_inf_system_host, arg_inf_system_port, arg_delay

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app = flask.Flask(__name__)
    app.config["DEBUG"] = True
    app.config['JSON_SORT_KEYS'] = False
    app.register_blueprint(quadratic_api)
    app.register_blueprint(general_api)
    port, information_system_host, information_system_port, delay = read_config()
    print("Information system is at", information_system_host + ":" + str(information_system_port))
    app.run(host="0.0.0.0", port=port)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
