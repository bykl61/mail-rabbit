const express = require('express');
const bodyParser = require('body-parser');
const emailController = require('./controllers/emailController');
const { connectToRabbitMQ } = require("./config/rabbitmqConfig");
const { startEmailWorker } = require("./workers/emailWorker");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting server...');
console.log('PORT:', PORT);

app.use(bodyParser.json());

app.post('/send-email', emailController.sendEmailController);

async function startServer() {
    try {
        await connectToRabbitMQ();

        await startEmailWorker();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();