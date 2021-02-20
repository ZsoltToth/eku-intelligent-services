"""Servlets to general urls"""



from flask import Blueprint

general_api = Blueprint('general_api', __name__)

@general_api.route('/', methods=['GET'])
def hello():
    """
    Hello World
    ---
    responses:
      200:
        description: Hello World
    """
    return "Hello"
