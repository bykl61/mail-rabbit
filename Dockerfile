# Node.js image
FROM node:14

# App directory
WORKDIR /usr/src/app

ARG RABBITMQ_USER
ARG RABBITMQ_PASS

# Dependencies
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "src/app.js"]
