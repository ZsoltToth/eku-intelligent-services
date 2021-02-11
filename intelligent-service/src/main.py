"""
Main file for server
"""

from flask import Flask, jsonify
from flask_swagger import swagger
from flask_swagger_ui import get_swaggerui_blueprint
from quadraticcontroller import quadratic_api
from generalcontroller import general_api
import config


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app = Flask(__name__)
    app.config["DEBUG"] = True
    app.config['JSON_SORT_KEYS'] = False
    app.register_blueprint(quadratic_api)
    app.register_blueprint(general_api)
    port, information_system_host, information_system_port, delay = config.read_config()
    print("Information system is at", information_system_host + ":" + str(information_system_port))

    @app.route("/spec")
    def spec():
        swag = swagger(app)
        swag['info']['version'] = "1.0"
        swag['info']['title'] = "API of Intelligent Service"
        return jsonify(swag)


    SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
    API_URL = '/spec'  # Our API url (can of course be a local resource)

    # Call factory function to create our blueprint
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,  # Swagger UI static files will be mapped to '{SWAGGER_URL}/dist/'
        API_URL,
        config={  # Swagger UI config overrides
            'app_name': "Test application"
        }
    )

    app.register_blueprint(swaggerui_blueprint)

    app.run(host="0.0.0.0", port=port)


# See PyCharm help at https://www.jetbrains.com/help/pycharm/
