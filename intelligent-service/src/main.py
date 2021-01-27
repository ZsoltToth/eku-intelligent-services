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
    return __get_port(), __get_is_host(), __get_is_port(), __get_delay()


def __get_port():
    port = os.environ.get('PORT')
    if (port is None) or (not port.isdigit()):
        raise OSError('PORT is missing or not a number!')
    return port


def __get_is_host():
    is_host = os.environ.get('IS_HOST')
    if is_host is None:
        raise OSError('IS_HOST is missing!')
    return is_host


def __get_is_port():
    is_port = os.environ.get('IS_PORT')
    if (is_port is None) or (not is_port.isdigit()):
        raise OSError('IS_PORT is missing or not a number!')
    return is_port


def __get_delay():
    delay = os.environ.get('DELAY')
    if (delay is None) or (not delay.isdigit()):
        raise OSError('DELAY is missing or not a number')
    return delay


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
