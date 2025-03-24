#!/bin/sh

sudo docker compose --env-file env/development/.env -f compose.development.yaml down