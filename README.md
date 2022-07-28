# Events booking app
Simple application with NestJS, GraphQL, MongoDB about booking events.

## Installation
Use the javascript package manage npm inside server folder.

```bash
npm install 
```
Fill in .env file using env.xample file.

## Usage
Use this commands to start application server.
``` bash
docker-compose up -d
npm run start
```
Go to [http://localhost:3000/graphql](http://localhost:3000/graphql) and make your requests.
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## Features
* Crud operations with events, users, booking entities.
* Login with gaining access_token.
* JWT auth guard protection.
* Role-based guards.
* Some testing.