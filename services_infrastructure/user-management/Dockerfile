FROM python:3.7-alpine

RUN mkdir app

WORKDIR /app
COPY . .

RUN apk update
RUN apk add postgresql-dev gcc python3-dev musl-dev libffi-dev
RUN pip install --upgrade pip && pip install pip-tools
RUN pip install -r requirements.txt

EXPOSE 5000
ENTRYPOINT ["python", "-m", "app"]
