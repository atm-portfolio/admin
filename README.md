# Admin Client

This is a React client that allows an administrator user to add projects, products and see reports based on user interaction with a Vue3 client called consumer client.

All API calls are made to a NodeJS API, this API uses MongoDB to store data.

## Functionality

- An admin user can Add/Remove projects
- An admin user can Add/Remove products
- An admin user can See reports based on user interaction with the consumer client

## How it works

The client makes API calls to the NodeJS API to log in, control projects, control products and display reports.
This client relies on Consumer Client in order to receive report data from users interaction.

## Technologies Used

The client was built using the following technologies:

- React
- React Router
- Vite
- SASS
- Playwright
- ESLint
- Prettier
- TypeScript

## Running the Project

To run the project, you need to have NodeJS installed. You can then run the following commands:

- npm install to install the dependencies
- npm run build to build the project
- npm run preview to start a development server
- npm run test to run the tests
