#!/bin/bash

# Check if SECRET_JSON environment variable is set
if [ -z "$SECRET_JSON" ]; then
  echo "SECRET_JSON environment variable is not set."
  exit 1
fi

# Parse and output to secrets.json
echo "$SECRET_JSON" | jq '.' > ./secrets.json

# Check if jq command succeeded
if [ $? -eq 0 ]; then
  echo "JSON has been successfully written to secrets.json."
else
  echo "Failed to write JSON to secrets.json."
  exit 1
fi