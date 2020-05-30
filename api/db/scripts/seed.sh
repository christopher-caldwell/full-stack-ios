#!/bin/sh

source .env.local

node db/scripts/seed.js

if [ $? == 0 ]
then
	aws dynamodb batch-write-item \
    --request-items file://db/seed.json \
 		--endpoint-url http://localhost:8000
else
	printf "\n\nFailed to write JSON for seeding"
fi