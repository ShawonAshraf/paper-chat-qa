FROM python:3.11.7-bookworm
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
ENV OLLAMA_BASE_URL=http://localhost:11434
EXPOSE 8000
CMD [ "uvicorn",  "api:app", "--host", "0.0.0.0", "--port", "8000"]

