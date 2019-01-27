#!/bin/bash -x

docker build -t stephaneeybert/ngzero --rm=true .
docker build -t stephaneeybert/ngzero-dev --rm=true -f Dockerfile.dev .
if [ $? -eq 0 ]; then
docker tag stephaneeybert/ngzero-dev localhost:5000/ngzero
docker push localhost:5000/ngzero
docker build -t stephaneeybert/ngzero-prod --rm=true -f Dockerfile.prod .
docker tag stephaneeybert/ngzero-prod thalasoft.com:5000/ngzero
docker push thalasoft.com:5000/ngzero
fi
