# Docker Containerization of Python Application

Docker based containerization of a simple Python application.
The container run the main.py from the src directory. 


```shell script
docker build --tag python:container .
docker run -p <host_port>:<container_port> --name <name> -e PORT=<container_port> -e IS_HOST=<is_host> -e IS_PORT=<is_port> -e DELAY=<delay> python:container
```