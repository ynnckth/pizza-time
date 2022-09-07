#!/bin/sh
# ########################################################################################################## #
# This script uses the swagger-code-gen-cli docker image to generate a typescript-fetch client based on the  #
# specified OpenAPI specification file.                                                                      #
# ########################################################################################################## #

set -x # prints a trace of executed commands
set -e # immediately exit if any command has a non-zero exit status

SWAGGER_CODEGEN_VERSION=3.0.35
API_SPEC_FILENAME=apispec.yaml

docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli-v3:$SWAGGER_CODEGEN_VERSION generate \
    -i /local/$API_SPEC_FILENAME \
    -l typescript-fetch \
    -o /local/generated
