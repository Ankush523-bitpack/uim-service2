# Meroku UIM Server

A server-side implementation of the WebAuthn API using Express, PostgreSQL, and the `@passwordless-id/webauthn` library. This server provides endpoints for registering, authenticating, and managing WebAuthn credentials.

## Features

- Register WebAuthn credentials.
- Authenticate using WebAuthn credentials.
- Store credentials and user data in PostgreSQL.
- Docker support for easy setup and deployment.

## Requirements

- Node.js (LTS version recommended)
- PostgreSQL database
- Docker (optional, for containerized deployment)

## Installation

### Local Development

1. Clone the repository:

    git clone [https://github.com/merokudao/uim-service] webauthn-server
    cd webauthn-server


2. Install dependencies:

    npm install


3. Set up the PostgreSQL database and modify the connection details in the server configuration if necessary.

4. Start the server:

    npm run dev


The server should be running on `http://localhost:3000`.

### Using Docker

1. Clone the repository:

    git clone [https://github.com/merokudao/uim-service] webauthn-server
    cd webauthn-server


2. Use `docker-compose` to build and start the services:

    docker-compose up


This will start both the Express server and PostgreSQL database as Docker containers. The server will be accessible at `http://localhost:3000`.

## API Endpoints

- **POST** `/request-challenge`: Request a challenge for a given username.
- **POST** `/register`: Register a new WebAuthn credential.
- **GET** `/credentials/:username`: Fetch stored credentials for a given username.
- **POST** `/authenticate`: Authenticate using a WebAuthn credential.

## Database Schema

The server uses the following tables in the PostgreSQL database:

- `challenges`: Stores generated challenges for users.
- `users`: Stores WebAuthn credentials, Ethereum wallet addresses, and other user data.

## Contributing

If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. Ensure that your code adheres to the project's style guidelines and all tests pass.

## License

[MIT](LICENSE) © [Meroku]
