"""Quadratic equation solver service"""


from threading import Thread
import time
import numpy as np
import requests
import config

def solve_quadratic(coeff_a, coeff_b, coeff_c):
    """Returns the discriminant and the solution of the quadratic equation coefficients"""
    discriminant = calculate_discriminant(coeff_a, coeff_b, coeff_c)
    result = {"discriminant": discriminant}
    if discriminant < 0:
        result["solution"] = []
    elif discriminant == 0:
        result["solution"] = [get_roots(coeff_a, coeff_b, coeff_c).tolist()[0]]
    else:
        result["solution"] = get_roots(coeff_a, coeff_b, coeff_c).tolist()
    return result


def get_roots(coeff_a, coeff_b, coeff_c):
    """Returns the roots of the given quadratic equation coefficients"""
    coeffs = [coeff_a, coeff_b, coeff_c]
    return np.roots(coeffs)


def calculate_discriminant(coeff_a, coeff_b, coeff_c):
    """Returns the discriminant of the given quadratic equation coefficients"""
    discriminant = coeff_b * coeff_b - 4 * coeff_a * coeff_c
    return discriminant

def solve_quadratic_async(task_id, coeff_a, coeff_b, coeff_c):
    """Solve task in thread"""
    thread = Thread(target=notify_result, args=(task_id, coeff_a, coeff_b, coeff_c))
    thread.daemon = True
    thread.start()



def notify_result(task_id, coeff_a, coeff_b, coeff_c):
    """Notify the information system about the solved quadratic equation."""
    payload = solve_quadratic(coeff_a, coeff_b, coeff_c)
    delay = int(config.__get_delay())  # pylint: disable=W0212
    host = config.__get_is_host()  # pylint: disable=W0212
    port = config.__get_is_port()  # pylint: disable=W0212
    for i in range(delay):
        print("Working... {}/{}".format(i + 1, delay))
        time.sleep(1)
    requests.post('http://' + host + ":" + port + "/qe/async/notify/" + task_id, json=payload)
    print("Thread Finished :")
