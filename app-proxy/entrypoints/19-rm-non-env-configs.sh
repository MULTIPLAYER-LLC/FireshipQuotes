#!/bin/sh

# remove all configs besides the one we care about, at runtime! (to let us use the same image everywhere)

echo "env: ${ENV}"
echo "templates: $(ls -d /etc/nginx/templates/*)"
# ls -d /etc/nginx/templates/* | grep -v ${ENV} | xargs realpath | xargs rm
find /etc/nginx/templates -type f ! -name "*${ENV}*" -exec rm {} +
