# Email RabbitMQ App

A simple email sending application using RabbitMQ as a message broker.

## Description

This application demonstrates asynchronous email sending using RabbitMQ. It leverages `nodemailer` for email dispatch and `amqplib` for RabbitMQ interaction, providing a lightweight yet powerful solution for queued email delivery.

## Features

- Asynchronous email sending via RabbitMQ message queue
- Simple REST API for queueing email messages
- RabbitMQ management interface for queue monitoring

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Docker](https://www.docker.com/) (for running RabbitMQ)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bykl61/mail-rabbit.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your email configuration:
   ```
   EMAIL_SERVICE=<your-email-service>
   EMAIL_USER=<your-email>
   EMAIL_PASS=<your-email-password>
   RABBITMQ_URL=amqp://guest:guest@localhost:5672
   ```

## Usage

1. Start RabbitMQ using Docker:
   ```bash
   docker-compose up -d
   ```

2. Run the application:
   ```bash
   npm start
   ```

## Testing

Execute the test suite with:
```bash
npm test
```

## API Endpoints

### Send Email
- **POST** `/send-email`
- **Body:**
  ```json
  {
    "email": "recipient@example.com",
    "name": "Recipient Name"
  }
  ```
- **Responses:**
    - `200 OK`: Email queued for delivery
    - `400 Bad Request`: Missing email or name
    - `500 Internal Server Error`: Request processing error

## Dependencies

- `amqplib`: RabbitMQ client
- `body-parser`: Request body parsing
- `dotenv`: Environment variable management
- `express`: Web framework
- `nodemailer`: Email sending library
- `nodemon`: Development auto-restart utility

## Dev Dependencies

- `jest`: Testing framework

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Author

Mehmet Baykal
