"""
Main file for server
"""

import flask
from quadraticcontroller import quadratic_api
from generalcontroller import general_api
import config

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app = flask.Flask(__name__)
    app.config["DEBUG"] = True
    app.config['JSON_SORT_KEYS'] = False
    app.register_blueprint(quadratic_api)
    app.register_blueprint(general_api)
    port, information_system_host, information_system_port, delay = config.read_config()
    print("Information system is at", information_system_host + ":" + str(information_system_port))
    app.run(host="0.0.0.0", port=port)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
