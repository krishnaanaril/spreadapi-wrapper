# spreadapi-wrapper

A lightweight TypeScript/JavaScript wrapper for the Spread API, designed to simplify integration with Google Sheets or similar spreadsheet APIs.

## Features
- Type-safe batch requests for reading and writing rows
- Simple configuration and usage
- Supports custom ordering, pagination, and limits

## Installation

```sh
npm install spreadapi-wrapper
```

## Usage

```typescript
import { SpreadClient } from 'spreadapi-wrapper';

const client = new SpreadClient({
  sheetUrl: 'https://api.spreadapi.com/sheet-url',
  sheetName: 'Sheet1',
  accessKey: 'your-access-key',
});

// Insert rows
await client.insertRows([
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
]);

// Get a single row by ID
const row = await client.getRow(1);

// Get multiple rows with options
const rows = await client.getRows({
  order: 'DESC',
  start_id: 10,
  limit: 5,
});
```

## API

### `SpreadClient(config)`
- `sheetUrl`: string – The API endpoint URL for your sheet
- `sheetName`: string – The name of the sheet to operate on
- `accessKey`: string – Your Spread API access key

### Methods
- `insertRows<T>(payloads: T[]): Promise<SpreadApiBatchResponse<T>>` – Insert multiple rows
- `getRow<T>(id: number): Promise<SpreadApiBatchResponse<T>>` – Get a single row by ID
- `getRows<T>(options?): Promise<SpreadApiBatchResponse<T>>` – Get multiple rows with optional `order`, `start_id`, and `limit`

## Development

- Build: `npm run build`
- Test: `npm test`

## License

MIT
