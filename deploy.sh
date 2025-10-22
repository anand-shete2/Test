#!/bin/bash


export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
# nvm use 22

echo "=== Deployment Started ==="

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
pm2 delete test || true


# Start new processes
cd test
pm2 start npm --name "test" -- start

echo "=== Deployment Finished 🎉 ==="