#!/usr/bin/env node

import fs from 'node:fs';

const { SECRETS_JSON } = process.env;

if (!SECRETS_JSON) {
  console.error('SECRETS_JSON environment variable is not set.');
  process.exit(1);
}

let jsonData;
try {
  jsonData = JSON.parse(SECRETS_JSON);
} catch (error) {
  console.error('Failed to parse JSON:', error.message);
  process.exit(1);
}

fs.writeFile(
  './secrets.json',
  JSON.stringify(jsonData, null, 2),
  'utf8',
  (err) => {
    if (err) {
      console.error('Failed to write JSON to secrets.json:', err.message);
      process.exit(1);
    } else {
      console.log('JSON has been successfully written to secrets.json.');
    }
  },
);
