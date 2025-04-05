# Use an appropriate Node.js base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install nodemon globally within the image OR rely on the project's dev dependency
# Option 1: Global install (if you prefer)
# RUN npm install -g nodemon

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install ALL dependencies, including development dependencies needed for nodemon
# Make sure devDependencies are installed for nodemon to be available if not global
RUN npm install

# NOTE: We DO NOT copy the rest of the source code (COPY . .)
# It will be mounted via docker-compose volumes for development.

# Expose the port the application will run on
EXPOSE 3000

# The command to run using nodemon (using the script from package.json)
# This will watch for changes in the mounted volume.
CMD [ "npm", "run", "dev" ]