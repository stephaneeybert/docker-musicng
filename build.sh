#!/bin/bash -x

docker build -t stephaneeybert/musicng --rm=true .
docker build -t stephaneeybert/musicng-dev --rm=true -f Dockerfile.dev .
if [ $? -eq 0 ]; then
docker tag stephaneeybert/musicng-dev localhost:5000/musicng
docker push localhost:5000/musicng
docker build -t stephaneeybert/musicng-prod --rm=true -f Dockerfile.prod .
docker tag stephaneeybert/musicng-prod thalasoft.com:5000/musicng
#docker push thalasoft.com:5000/musicng
fi
