#!/bin/bash -x

# Expand the secrets TODO
#export DB_ROOT_PASSWORD={{DOCKER-SECRET:DB_ROOT_PASSWORD}}
#source /usr/local/ngzero/expand-secrets.sh

# Start the HTTP server
/usr/local/apache/bin/apachectl start && tail -f /dev/null

