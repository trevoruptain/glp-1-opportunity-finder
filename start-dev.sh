#!/bin/bash

echo "🚀 Starting GLP-1 Opportunity Finder (Development Mode)..."
echo ""
echo "This mode includes:"
echo "✅ Hot reloading for both frontend and backend"
echo "✅ Development environment variables"
echo "✅ Volume mounts for live code changes"
echo ""
echo "Building and starting containers..."
docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build

echo ""
echo "To stop the application, run: docker-compose down" 