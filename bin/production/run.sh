#!/bin/sh

docker compose --env-file env/production/.env -f compose.production.yaml $*