#!/bin/bash

# Clean up existing processes and lock files
echo "Cleaning up..."
pkill -f "hugo server" >/dev/null 2>&1 || true
sleep 1

# Set higher file limits
echo "Setting file descriptor limit..."
ulimit -n 4096
echo "File descriptor limit set to $(ulimit -n)"

# Remove lock file
echo "Removing lock file..."
rm -f Boolokam/.hugo_build.lock

# Start Hugo with optimized settings
echo "Starting Hugo server..."
cd Boolokam && hugo server -D --watch=false 