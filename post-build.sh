#!/bin/bash
# script to move files from dist folder to www/consumer folder

SOURCE_DIR="$(pwd)/dist"
DEST_DIR="$(pwd)/../www/admin"

# Copy files from SOURCE_DIR to DEST_DIR
cp -r "$SOURCE_DIR"/* "$DEST_DIR"
cp _redirects "$DEST_DIR"