FROM python:3.8

COPY src ./src
COPY Pipfile ./
COPY Pipfile.lock ./

RUN pip install pipenv
RUN pipenv install --deploy --system --ignore-pipfile
#RUN pipenv shell

CMD python ./src/main.py