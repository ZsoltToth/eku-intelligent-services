"""
Main file for server
"""
import os
import flask
from quadraticcontroller import quadratic_api
from generalcontroller import general_api


def __get_number_from_environment(envName):
    value = os.environ.get(envName)
    if (value is None) or (not value.isdigit()):
        raise OSError(f'{envName} is missing or not a number!')
    return value


def __get_port():
    return __get_number_from_environment('PORT')


def __get_is_port():
    return  __get_number_from_environment('IS_PORT')


def __get_delay():
    return __get_number_from_environment('DELAY')


def __get_is_host():
    is_host = os.environ.get('IS_HOST')
    if is_host is None:
        raise OSError('IS_HOST is missing!')
    return is_host

def read_config():
    return __get_port(), __get_is_host(), __get_is_port(), __get_delay()


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
