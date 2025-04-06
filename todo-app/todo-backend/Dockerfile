# todo-app/todo-backend/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

COPY . .

# Create a non-root user and group for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# Switch to the non-root user
USER appuser

# Application's default port
EXPOSE 3000

# Command to run the application in production mode
CMD [ "npm", "start" ]