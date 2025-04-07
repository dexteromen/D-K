# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

# Define the Node.js version as an argument.
ARG NODE_VERSION=20

# Use the official Node.js Alpine-based image.
FROM node:${NODE_VERSION}-alpine

# Set the default Node.js environment to production.
ENV NODE_ENV=production

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Install dependencies leveraging Docker's caching mechanism.
RUN --mount=type=bind,source=package.json,target=/usr/src/app/package.json \
    --mount=type=bind,source=package-lock.json,target=/usr/src/app/package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Create a non-root user and switch to it for security.
USER node

# Copy the remaining application source files into the container.
COPY . .

# Specify the port the application listens on.
EXPOSE 3000

# Start the application using the development script.
CMD ["npm", "run", "dev"]
