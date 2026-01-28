#!/bin/bash

# GraphQL Trainer Update Script
# Updates an existing installation to the latest version

set -e

echo "🔄 GraphQL Trainer - Update Script"
echo "===================================="
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: This doesn't appear to be a git repository."
    echo "Please run this script from your graphql-trainer directory."
    echo ""
    echo "Or reinstall fresh:"
    echo "  curl -fsSL https://raw.githubusercontent.com/rpretzer/graphql-trainer/main/install.sh | bash"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "⚠️  Warning: You have uncommitted changes."
    echo ""
    read -p "Continue anyway? This will stash your changes. (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Update cancelled."
        exit 0
    fi
    git stash save "Auto-stash before update $(date)"
    echo "✓ Changes stashed"
fi

# Fetch latest changes
echo "📡 Fetching latest updates..."
git fetch origin

# Check if updates are available
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})

if [ $LOCAL = $REMOTE ]; then
    echo "✓ Already up to date!"
    echo ""
    echo "You have the latest version of GraphQL Trainer."
    exit 0
fi

# Pull updates
echo "⬇️  Pulling updates..."
git pull origin main

# Update dependencies
echo ""
echo "📚 Updating dependencies..."
npm install

echo ""
echo "✅ Update complete!"
echo ""
echo "🎓 New features added:"
echo "   • 15 lessons (up from 8)"
echo "   • Apollo documentation links"
echo "   • Improved solution display"
echo "   • Advanced topics: aliases, fragments, variables, directives, pagination"
echo ""
echo "🚀 Start learning:"
echo "   npm start"
echo ""
