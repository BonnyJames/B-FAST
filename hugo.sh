#!/bin/bash

# Hugo Management Script - Simplified version
# Usage: ./hugo.sh [clean|start|fix]

# Default mode
MODE=${1:-start}

# Set colors for output
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print with color
print_message() {
  echo -e "${GREEN}[Hugo] ${NC}$1"
}

print_warning() {
  echo -e "${YELLOW}[Warning] ${NC}$1"
}

print_error() {
  echo -e "${RED}[Error] ${NC}$1"
}

print_info() {
  echo -e "${BLUE}[Info] ${NC}$1"
}

# Check that we're in the right directory
verify_directory() {
  if [ ! -d "Boolokam" ]; then
    if [ -d "../Boolokam" ]; then
      cd ..
      print_warning "Changed directory to $(pwd)"
    else
      print_error "Boolokam directory not found. Please run this script from the Boolokam-Hugo directory."
      exit 1
    fi
  fi
}

# Function to clean up processes and lock files
cleanup() {
  print_message "Cleaning up processes and lock files..."
  pkill -f "hugo server" >/dev/null 2>&1 || true
  find . -name ".hugo_build.lock" -type f -delete
}

# Function to verify theme setup
verify_theme() {
  print_message "Verifying theme setup..."
  if [ ! -d "Boolokam/themes/boolokam-theme" ]; then
    print_warning "Theme directory not found. Creating theme structure..."
    mkdir -p Boolokam/themes/boolokam-theme/{layouts,static,assets,archetypes}
    
    # Copy contents if the source directories exist
    if [ -d "Boolokam/layouts" ]; then
      cp -r Boolokam/layouts/* Boolokam/themes/boolokam-theme/layouts/ 2>/dev/null || true
    fi
    
    if [ -d "Boolokam/static" ]; then
      cp -r Boolokam/static/* Boolokam/themes/boolokam-theme/static/ 2>/dev/null || true
    fi
    
    if [ -d "Boolokam/archetypes" ]; then
      cp -r Boolokam/archetypes/* Boolokam/themes/boolokam-theme/archetypes/ 2>/dev/null || true
    fi
    
    print_message "Theme structure created."
  else
    print_message "Theme directory exists."
  fi
}

# Basic clean function - removes generated files
clean_basic() {
  print_message "Cleaning generated files..."
  rm -rf Boolokam/resources
  rm -rf Boolokam/public
  find Boolokam -name ".hugo_build.lock" -type f -delete
}

# Start Hugo server
start_hugo() {
  cd Boolokam || { print_error "Failed to change to Boolokam directory"; exit 1; }
  
  # Check if port 1313 is already in use
  if command -v lsof >/dev/null 2>&1; then
    PORT_IN_USE=$(lsof -i:1313 -t 2>/dev/null)
    if [ -n "$PORT_IN_USE" ]; then
      print_warning "Port 1313 is already in use. Killing the process..."
      kill -9 $PORT_IN_USE 2>/dev/null || true
      sleep 1
    fi
  fi
  
  if [ "$MODE" == "fix" ]; then
    print_message "Starting Hugo in FIX mode (disableFastRender)..."
    hugo server -D --theme=boolokam-theme --disableFastRender
  else
    print_message "Starting Hugo in NORMAL mode..."
    hugo server -D --theme=boolokam-theme --navigateToChanged
  fi
  
  EXIT_CODE=$?
  if [ $EXIT_CODE -ne 0 ]; then
    print_error "Hugo server exited with code $EXIT_CODE"
    print_info "Try running './hugo.sh fix' to resolve potential issues."
    exit $EXIT_CODE
  else
    print_message "Hugo server exited successfully."
  fi
}

# Main execution based on mode
verify_directory

case $MODE in
  fix)
    print_message "Running in FIX mode - troubleshooting Hugo issues"
    cleanup
    clean_basic
    verify_theme
    start_hugo
    ;;
  clean)
    print_message "Running in CLEAN mode - cleaning generated files"
    cleanup
    clean_basic
    print_message "Clean completed. Run './hugo.sh start' to start the server."
    ;;
  start|*)
    print_message "Running in NORMAL mode"
    cleanup
    start_hugo
    ;;
esac 