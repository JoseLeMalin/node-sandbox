# command: docker build .
# Use an official Node.js runtime as a base image
FROM node:21-alpine3.19

# Set the working directory in the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json, pnpm-lock.yaml, and pnpm-workspace.yaml to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install project dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN pnpm run build
RUN pnpm prune

# Expose the port that the application will run on
EXPOSE 3000

# Define the command to run your application
CMD ["pnpm", "start"]