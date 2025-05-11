#!/bin/bash

# Clean install dependencies
npm ci

# Clean the dist directory
npm run clean

# Build TypeScript
npx tsc

# Verify the build
if [ -f "dist/index.js" ]; then
    echo "Build successful!"
    exit 0
else
    echo "Build failed: dist/index.js not found"
    exit 1
fi 