#!/bin/sh

mkdir -p ./mnt-development/pocketbase
mkdir -p ./mnt-development/grafana
mkdir -p ./mnt-development/loki
mkdir -p ./mnt-development/tarpit

sudo docker compose --env-file env/development/.env -f compose.development.yaml up --build -d --remove-orphans
