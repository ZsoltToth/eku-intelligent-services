ARG PORT=5000
FROM python:3.8

WORKDIR /usr/src/app

COPY src ./src
COPY Pipfile ./

RUN pip install pipenv
RUN pipenv install --deploy --system --skip-lock
#RUN pipenv shell
EXPOSE ${PORT}

CMD python ./src/main.py

