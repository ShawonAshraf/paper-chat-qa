FROM python:3.11.7-bookworm
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 8000
CMD [ "uvicorn",  "api:app", "--host", "0.0.0.0", "--port", "8000"]

