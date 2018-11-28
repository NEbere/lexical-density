# VAI

An API where a user can query the complexity of a text.

## Tools

- Node: v9.11.1
- Express: v^4.16.4
- MongoDB: v4.0.0

## Set-up

### To setup and run project

- cd into project directory, run `npm install`
- Start DB: ensure mongoDB is installed, run `mongod` from the command line
- For the first time running, setup database seed. run `npm run seedDb`
- To start the API, run `npm start`, visits the API on localhost:5000/_health to see if it is up and running

### Test

- To run test: run `npm test`. This will run `standard js` test then test files.

NB: ensure data has been loaded in DB before running test

## TODO

- Add authentication to the API endpoints  for updating the non-lexical words in the database
- Dockerize app, to make it easier to deploy and manage updates in a containerized manner
- Add more test to the APIs
- Create env config for test, development and production