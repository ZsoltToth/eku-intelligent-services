"""
Configuration file
"""

import os


def __get_number_from_environment(env_name):
    """Number validator"""
    value = os.environ.get(env_name)
    if (value is None) or (not value.isdigit()):
        raise OSError(f'{env_name} is missing or not a number!')
    return value


def __get_port():
    """PORT Environment variable"""
    return __get_number_from_environment('PORT')


def __get_is_port():
    """IS_PORT Environment variable"""
    return __get_number_from_environment('IS_PORT')


def __get_delay():
    """DELAY Environment variable"""
    return __get_number_from_environment('DELAY')


def __get_is_host():
    """IS_HOST Environment variable"""
    is_host = os.environ.get('IS_HOST')
    if is_host is None:
        raise OSError('IS_HOST is missing!')
    return is_host


def read_config():
    """Reads configuration from Environment variables"""
    return __get_port(), __get_is_host(), __get_is_port(), __get_delay()
