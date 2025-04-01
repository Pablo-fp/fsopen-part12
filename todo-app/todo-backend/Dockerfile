# Stage 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# --- Optimization: Install dependencies first ---
COPY package*.json ./
RUN npm ci --omit=dev
# Or: RUN npm install --production

# --- Copy application source code ---
COPY . .

# --- Security: Run as a non-root user (recommended) ---
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# --- Expose port and define start command ---
EXPOSE 3000
CMD [ "npm", "start" ]