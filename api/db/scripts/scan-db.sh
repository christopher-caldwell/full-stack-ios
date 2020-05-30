#!/bin/sh

source .env.local

aws dynamodb scan \
 --table-name exam-tips-db \
 --endpoint-url http://localhost:8000