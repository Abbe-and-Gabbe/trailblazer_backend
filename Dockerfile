# Use the official Node.js 14 image as the base image
FROM node:20.11.1

# Set the working directory inside the container
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app source code to the working directory
COPY . .

# Expose the port that the app will listen on
EXPOSE 3000

# Start the app
CMD [ "npm", "run", "start:dev" ]