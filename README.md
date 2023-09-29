# Institute Management API

Extensive documentation with examples [here](https://documenter.getpostman.com/view/20805847/2s9YJaX3N7)

## Description
> Backend API for Institute Management, which is a directory website. This api is helpful in getting detailed information about institute programs, eg- what courses they offer, other details. 

## Features
- Handle validation using DTOs for body parameters and params
- Proper Error responses with message and status code
- Encrypt user passwords with bcrypt
- Protect sensitive routes using passport jwt strategy
- API documentation using Postman
- Config Schema validation using Joi
- Used environment variables for storing sensitive keys and other configs
- Used online PostreSQL db for storing records and TypeORM for database operations

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
