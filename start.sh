#!/bin/bash -x

# Start the HTTP server
/usr/local/apache/bin/apachectl start && tail -f /dev/null

