"""
Main file for server
"""
import numpy as np
import flask
from quadraticcontroller import quadratic_api
from generalcontroller import general_api

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['JSON_SORT_KEYS'] = False
app.register_blueprint(quadratic_api)
app.register_blueprint(general_api)

def print_hi(name):
    """ Docstring """
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')
    values = np.random.randint(0, 90, 10)
    print(values)
    print(values.sum())
    app.run(host="0.0.0.0")

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
