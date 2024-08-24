#!/usr/bin/env node

const fs = require('fs');

const { SECRET_JSON } = process.env;

if (!SECRET_JSON) {
  console.error('SECRET_JSON environment variable is not set.');
  process.exit(1);
}

let jsonData;
try {
  jsonData = JSON.parse(SECRET_JSON);
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
