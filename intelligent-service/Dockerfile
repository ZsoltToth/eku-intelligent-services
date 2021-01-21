FROM python:3.8

WORKDIR /usr/src/app

COPY src ./src
COPY Pipfile ./
COPY Pipfile.lock ./

RUN pip install pipenv
RUN pipenv install --deploy --system --ignore-pipfile
#RUN pipenv shell
EXPOSE 5000
ENV FLASK_APP=./src/app.py
#CMD python ./src/main.py
CMD ["flask", "run", "-h", "0.0.0.0", "-p", "5000"]

