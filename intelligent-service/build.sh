#!/usr/bin/env bash

DOCKER_TAG_NAME=python:container

pylint src/main.py || exit 1;

docker build --tag $DOCKER_TAG_NAME .
