#!/bin/sh

sudo docker compose --env-file env/development/.env -f compose.production.yaml down