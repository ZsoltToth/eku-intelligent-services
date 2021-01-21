"""Quadratic equation solver service"""

import numpy as np


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
