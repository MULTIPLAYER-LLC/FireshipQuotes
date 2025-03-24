#!/bin/sh

mkdir -p ./mnt-production/pocketbase
mkdir -p ./mnt-production/grafana
mkdir -p ./mnt-production/loki
mkdir -p ./mnt-production/tarpit

sudo docker compose -f compose.production.yaml up --build -d --remove-orphans
