#!/bin/bash

set -e

printf "puck test: "
puck test
printf "puck self-test: "
puck self-test
printf "puck build: "
puck build
printf "puck test: "
puck test
printf "puck self-test: "
puck self-test
