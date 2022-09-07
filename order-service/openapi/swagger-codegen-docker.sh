#!/bin/sh
# ########################################################################################################## #
# This script uses the swagger-code-gen-cli docker image to generate a typescript-fetch client based on the  #
# specified OpenAPI specification file.                                                                      #
# ########################################################################################################## #

set -x # prints a trace of executed commands
set -e # immediately exit if any command has a non-zero exit status

SWAGGER_CODEGEN_VERSION=3.0.35
API_SPEC_FILENAME=openapi.json

# TODO: trigger maven build here to generate openapi.json

docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli-v3:$SWAGGER_CODEGEN_VERSION generate \
    -i /local/$API_SPEC_FILENAME \
    -l typescript-fetch \
    -o /local/generated

# Copy the generated client API to the frontend source folder
cp -R generated ../../
