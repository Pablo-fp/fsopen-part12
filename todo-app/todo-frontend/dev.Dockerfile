# my-app/frontend/dev.Dockerfile (Example for Node-based frontend)
# ONLY CREATE IF NEEDED - Often configured directly in docker-compose.dev.yml

FROM node:18-alpine 

WORKDIR /app

# Optionally install global dependencies if needed by your dev server/build
# RUN npm install -g some-cli-tool

# Copy package files ONLY if you intend to run install here instead of compose
# COPY package*.json ./
# RUN npm install

# The main purpose here is usually just providing the Node runtime.
# The command will be run from docker-compose.

EXPOSE 5173

# No CMD needed here if run from docker-compose