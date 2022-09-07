# Code Generation using Swagger CodeGen

## Prerequisites

- The provided script expects you to have `docker` installed on your machine to be able to execute the code generation 


## Generating Client Code

```shell
# Generate the TypeScript client code:
./swagger-codegen-docker.sh
# This will create a folder `generated` containing the generated code
```


## Open Points

- Where to place the generated code ideally?
- How to split the generated APIs into separate files (e.g. by controller)?
- Currently only consuming generated models (interfaces) -> check what else can be used from the generated code

## Links and Documentation

- [Swagger CodeGen Github Repo](https://github.com/swagger-api/swagger-codegen)
- [Swagger Editor - Online](https://editor.swagger.io/)
- [Swagger Pet Store Github Repo (reference implementation)](https://github.com/swagger-api/swagger-petstore)
- [npm package that wraps Swagger CodeGen](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)
