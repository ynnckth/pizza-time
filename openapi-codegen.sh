#!/bin/sh
# ########################################################################################################## #
# This script uses the swagger-code-gen-cli docker image to generate a typescript-fetch client based on the  #
# specified OpenAPI specification file.                                                                      #
# ########################################################################################################## #

set -x # prints a trace of executed commands
set -e # immediately exit if any command has a non-zero exit status

SWAGGER_CODEGEN_VERSION=3.0.35
API_SPEC_FILEPATH="order-service/openapi/openapi.json"
GENERATED_CODE_OUTPUT_PATH="frontend/generated"

# Generate the latest OpenAPI specification file
echo "Generating OpenAPI specification file ..."
cd order-service
./mvnw verify
cd ..
echo "Successfully generated OpenAPI specification file under ${API_SPEC_FILEPATH}"

# TODO: check where to place the generated client code (currently outside of the frontend consuming it)
echo "Generating client code for ${API_SPEC_FILEPATH} ..."
docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli-v3:$SWAGGER_CODEGEN_VERSION generate \
    -i /local/$API_SPEC_FILEPATH \
    -l typescript-fetch \
    -o /local/$GENERATED_CODE_OUTPUT_PATH

echo "Done"
