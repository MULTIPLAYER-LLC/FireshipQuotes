#!/bin/sh
#curl -XPOST -d @corpus.txt -H'Content-type: text/plain' http://localhost:8893/train

cat corpus.txt | xargs -P 2 -I % sh -c 'echo $(curl -s -XPOST -d "%" -H"Content-type: text/plain" http://localhost:8893/train)'