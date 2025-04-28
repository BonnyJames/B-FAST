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

# Ensure theme is properly set
echo "Verifying theme setup..."
if [ ! -d "Boolokam/themes/boolokam-theme" ]; then
  echo "Theme directory not found. Creating theme structure..."
  mkdir -p Boolokam/themes/boolokam-theme/{layouts,static,assets,archetypes}
  cp -r Boolokam/layouts/* Boolokam/themes/boolokam-theme/layouts/ 2>/dev/null || true
  cp -r Boolokam/static/* Boolokam/themes/boolokam-theme/static/ 2>/dev/null || true
  cp -r Boolokam/archetypes/* Boolokam/themes/boolokam-theme/archetypes/ 2>/dev/null || true
fi

# Start Hugo with optimized settings and theme
echo "Starting Hugo server with theme..."
cd Boolokam && hugo server -D --watch=false --theme=boolokam-theme 