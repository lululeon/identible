#! /bin/bash

# use available env vars, else set defaults:
dbhost="${DB_HOST:=localhost}"
dbport="${DB_PORT:=5432}"

echo "checking if postgres in CI runner is up at ${dbhost}:${dbport}..."

# # poll for 20 seconds max before bailing. REM: u need double quotes for string interpolation!
timeout 10 bash -c "until echo > /dev/tcp/${dbhost}/${dbport}; do sleep 0.5; done"
echo "done."
