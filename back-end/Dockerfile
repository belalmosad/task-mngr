FROM python:latest
EXPOSE 5000
WORKDIR /app
COPY . .
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install
CMD [ "poetry", "run", "flask", "run", "--host", "0.0.0.0" ]