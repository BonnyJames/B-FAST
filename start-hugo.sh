#!/bin/bash

# Increase file descriptor limits for this session
ulimit -n 4096

echo "File descriptor limit set to: $(ulimit -n)"

# Clean up any existing lock files
if [ -f "Boolokam/.hugo_build.lock" ]; then
  echo "Removing existing lock file..."
  rm Boolokam/.hugo_build.lock
fi

# Clean Hugo cache
echo "Cleaning Hugo cache..."
cd Boolokam
rm -rf resources/_gen
mkdir -p tmp

# Run Hugo with optimized settings
echo "Starting Hugo server..."
HUGO_CACHEDIR=tmp GOGC=20 hugo server -D --gc --renderToDisk=false --disableFastRender

echo "Hugo server exited with code $?" 