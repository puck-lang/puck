#!/bin/bash

set -e

printf "puck test: "
dist/bin/puck test
printf "puck self-test: "
dist/bin/puck self-test
printf "puck build: "
dist/bin/puck build
printf "puck test: "
dist/bin/puck test
printf "puck self-test: "
dist/bin/puck self-test
