import numpy as np


def solve_quadratic(a, b, c):
    discriminant = calculate_discriminant(a, b, c)
    result = {"discriminant": discriminant}
    if discriminant < 0:
        result["solution"] = []
    elif discriminant == 0:
        result["solution"] = [get_roots(a, b, c).tolist()[0]]
    else:
        result["solution"] = get_roots(a, b, c).tolist()
    return result


def get_roots(a, b, c):
    coeff = [a, b, c]
    return np.roots(coeff)


def calculate_discriminant(a, b, c):
    discriminant = b * b - 4 * a * c
    return discriminant
