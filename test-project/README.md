# test-api API Client

Automatically generated API client and documentation for test-api.

## Installation

```bash
npm install test-api-api-client
```

## Usage

```javascript
const { ApiClient } = require('test-api-api-client');

const client = new ApiClient({
  basePath: 'https://api.example.com/v1'
});

// Use the generated client
client.getUsers().then(users => {
  console.log(users);
});
```

## Development

### Generate API Client

```bash
npm run generate
```

### Watch for Changes

```bash
npm run watch
```

## Configuration

Edit `openapi.config.json` to customize generation settings.

## Auto-Publishing

This project is configured to automatically generate and publish API client code when OpenAPI specification files are updated in the `specs/` directory.
