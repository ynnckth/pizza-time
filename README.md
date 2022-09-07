# Pizza Time!

![CI](https://github.com/ynnckth/pizza-time/actions/workflows/main.yml/badge.svg)

*Exploring state-of-the-art state management and testing practices for ReactJS in 2022*

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the TypeScript template.

## Available scripts

```shell
# Install dependencies:
npm install

# Run in development mode (on port 3000):
npm start

# Run unit and integration tests: 
npm test

# Run e2e tests:
npm run cypress:open
```

## Topics covered in this project

- CRA using TypeScript template
- Routing using react-router-dom and BrowserRouter
- State management using Redux Toolkit
- Redux middleware using Thunk (default from Redux Toolkit)
- Fetching data using RTK Query
- React error boundary
- Form validation using Formik
- Unit and integration testing including a real store using react-testing-library and msw for mocking network requests
- E2e testing using cypress (stubbed network calls)

## Links and relevant documentation
- [Redux Toolkit TypeScript quick start](https://redux-toolkit.js.org/tutorials/typescript)
- [Official CRA template project using redux toolkit and typescript](https://github.com/reduxjs/cra-template-redux-typescript)
- [Redux async logic](https://redux.js.org/tutorials/essentials/part-5-async-logic)
- [Guidelines for writing tests for Redux](https://redux.js.org/usage/writing-tests)
- [Redux Toolkit Query Overview](https://redux-toolkit.js.org/rtk-query/overview)