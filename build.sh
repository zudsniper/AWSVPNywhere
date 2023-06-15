#!/bin/bash

# Install dependencies
npm install

# Compile TypeScript
npx tsc

# Start the app with PM2
npx pm2 start ecosystem.config.js

