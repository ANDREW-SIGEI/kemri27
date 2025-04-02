#!/bin/bash

# Start the Backend
echo "Starting backend server..."
cd backend && npm run dev &
BACKEND_PID=$!

# Start the Frontend
echo "Starting frontend server..."
cd .. && npm run dev &
FRONTEND_PID=$!

# Handle script termination
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM EXIT

# Wait
wait 