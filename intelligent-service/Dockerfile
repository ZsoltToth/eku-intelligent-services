FROM python:3.8

WORKDIR /usr/src/app

COPY src ./src
COPY Pipfile ./
COPY Pipfile.lock ./

RUN pip install pipenv
RUN pipenv install --deploy --system --ignore-pipfile
#RUN pipenv shell
EXPOSE 5000

CMD python ./src/main.py

