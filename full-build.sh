#!/bin/bash

set -e

puck test
puck self-test
puck build
puck test
puck self-test
