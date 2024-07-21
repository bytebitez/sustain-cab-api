# Use official Node.js image as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
