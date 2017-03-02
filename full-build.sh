#!/bin/bash

set -e

printf "cases: "
dist/bin/cases
printf "self-test: "
dist/bin/self-test
printf "self-test with babel: "
dist/bin/self-test --babel true
printf "puck build: "
dist/bin/puck build
printf "cases: "
dist/bin/cases
printf "self-test: "
dist/bin/self-test
printf "self-test with babel: "
dist/bin/self-test --babel true
echo "puck test: "
CI=true dist/bin/puck test
