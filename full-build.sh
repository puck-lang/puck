#!/bin/bash

set -e

printf "cases: "
dist/bin/cases
printf "self-test: "
dist/bin/self-test
printf "puck build: "
dist/bin/puck build
printf "cases: "
dist/bin/cases
printf "self-test: "
dist/bin/self-test
printf "puck test: "
CI=true dist/bin/puck test
