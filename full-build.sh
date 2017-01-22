#!/bin/bash

set -e

printf "test: "
dist/bin/test
printf "self-test: "
dist/bin/self-test
printf "puck build: "
dist/bin/puck build
printf "test: "
dist/bin/test
printf "self-test: "
dist/bin/self-test
printf "puck test: "
CI=true dist/bin/puck test
