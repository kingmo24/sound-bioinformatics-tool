# Use the official Node.js image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Define environment variable for PORT
ENV PORT 8080

# Run the application
CMD ["node", "src/index.js"]

