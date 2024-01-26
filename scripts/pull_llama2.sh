#!/usr/bin/bash

curl -X POST \
-H "Content-Type: application/json" \
-d '{"name":"llama2"}' \
 http://localhost:11434/api/pull
