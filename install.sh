#!/bin/bash

# GraphQL Trainer Installation Script
# This script clones and sets up the GraphQL Ecommerce Trainer

set -e

echo "🚀 GraphQL Ecommerce Trainer - Installation"
echo "==========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed."
    echo "Please install Node.js (v14 or higher) from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed."
    echo "Please install npm."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Set installation directory
INSTALL_DIR="${1:-$HOME/graphql-trainer}"

# Check if directory already exists
if [ -d "$INSTALL_DIR" ]; then
    echo "⚠️  Directory $INSTALL_DIR already exists."
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Installation cancelled."
        exit 0
    fi
    rm -rf "$INSTALL_DIR"
fi

# Clone the repository
echo "📦 Cloning repository..."
git clone https://github.com/rpretzer/graphql-trainer.git "$INSTALL_DIR"

# Navigate to directory
cd "$INSTALL_DIR"

# Install dependencies
echo ""
echo "📚 Installing dependencies..."
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "🎓 To start learning:"
echo "   cd $INSTALL_DIR"
echo "   npm start"
echo ""
echo "📖 Or read the README:"
echo "   cat $INSTALL_DIR/README.md"
echo ""
echo "Happy GraphQL learning! 🚀"
