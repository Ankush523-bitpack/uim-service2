#!/bin/bash

export PGPASSWORD=postgres

psql -h db -U postgres -c "CREATE DATABASE webauthn;"

psql -h db -U postgres -d webauthn -c "CREATE TABLE Challenges (challenge varchar, username varchar)"

psql -h db -U postgres -d webauthn -c "CREATE TABLE Users (username varchar, credential_id varchar, public_key varchar, algorithm varchar, wallet_address varchar)"

echo "Database created successfully!"
