# ---- Stage 1: Build ----
# Use a Node.js image for the build environment
FROM node:18-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Declare the build-time argument for the backend URL
# This value MUST be provided during 'docker build' via --build-arg
ARG VITE_BACKEND_URL

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies using npm ci for clean installs
RUN npm ci

# Copy the rest of the application source code
COPY . .

# --- Add the test execution step ---
    RUN echo "Running tests..." && \
    npm test
# --- Test step finished ---

# Build the application using the build-time argument
RUN echo "Building frontend with VITE_BACKEND_URL=${VITE_BACKEND_URL}" && \
    VITE_BACKEND_URL=${VITE_BACKEND_URL} npm run build

# ---- Stage 2: Serve ----
# Use a lightweight Nginx server to host the static files
FROM nginx:1.23-alpine

# Copy the built static files from the 'builder' stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration to handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default Nginx port)
EXPOSE 80

# Default command for Nginx image is usually sufficient
# CMD ["nginx", "-g", "daemon off;"]