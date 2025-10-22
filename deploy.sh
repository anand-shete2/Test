#!/bin/bash

echo "=== Starting Deployment ==="
which npm
which pm2
# Preserve .env file
cd ~
mv ~/test/.env ~
rm -r ~/test


# Clone the repository
git clone https://github.com/anand-shete2/Test
mv ~/Test/backend ~/test


# Install dependencies
cd test
npm ci --omit=dev
mv ~/.env .


# Cleanup old processes
rm -rf ~/Test
pm2 delete test


# Start new processes
cd test
pm2 start npm --name "test" -- start
hostname
pwd
whoami

echo "=== Deployment Finished ==="