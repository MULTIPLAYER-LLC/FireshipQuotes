#!/bin/sh

mkdir -p ./mnt-production/pocketbase
mkdir -p ./mnt-production/grafana
mkdir -p ./mnt-production/loki
mkdir -p ./mnt-production/tarpit

docker compose --env-file env/production/.env -f compose.production.yaml up --build -d --remove-orphans
