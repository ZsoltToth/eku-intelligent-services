#!/usr/bin/env bash

DOCKER_TAG_NAME=python:container

pylint src/ || exit 1;

docker build --tag $DOCKER_TAG_NAME .
