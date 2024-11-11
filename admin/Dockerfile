FROM python:3.11.3

WORKDIR /app

COPY ../tasks_shared /app/tasks_shared
COPY ../utils /app/utils
COPY ../settings.py /app/settings.py
COPY ../.env /app/.env
RUN pip install --no-cache-dir -r requirements.txt

COPY . .