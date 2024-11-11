FROM python:3.11.3

WORKDIR /app

COPY ../tasks_shared /app/tasks_shared
COPY ../utils /app/utils

RUN pip install --no-cache-dir -r requirements.txt

COPY . .