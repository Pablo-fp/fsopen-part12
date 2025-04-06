# todo-app/todo-frontend/Dockerfile
# Stage 1: Build the React application
FROM node:18-alpine AS build-stage

WORKDIR /app

# The backend URL used during build time. For production, this points
# to the path Nginx will use to proxy API requests.
ARG VITE_BACKEND_URL=/api

COPY package*.json ./

# Install only production dependencies (Vite is often a devDep, check if needed for build)
# If 'npm run build' requires devDeps, use 'npm ci' instead. Check your setup.
# Assuming build script works with only production deps:
# RUN npm ci --omit=dev
# If devDeps ARE needed for build (common with Vite):
RUN npm ci

COPY . .

# Log the backend URL used during build
RUN echo "Building frontend for production with VITE_BACKEND_URL=${VITE_BACKEND_URL}"

# Execute the production build script, passing the backend URL
RUN VITE_BACKEND_URL=${VITE_BACKEND_URL} npm run build

# The output static files are now in /app/dist
# We don't need a second stage here, Nginx will handle serving.