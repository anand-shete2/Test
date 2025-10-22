#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Load nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # Optional: for completion
nvm use 22  # e.g., nvm use 18 (match your running project's version)

echo "=== Starting Deployment ==="
whoami
pwd 
echo $HOME

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

echo "=== Deployment Finished ==="