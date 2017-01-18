#!/bin/bash

set -e

printf "puck test: "
dist/bin/test
printf "puck self-test: "
dist/bin/self-test
printf "puck build: "
dist/bin/puck build
printf "puck test: "
dist/bin/test
printf "puck self-test: "
dist/bin/self-test
