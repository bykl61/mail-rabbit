const amqp = require('amqplib');
require('dotenv').config();

let connection = null;
let channel = null;

const connectToRabbitMQ = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
        return channel;
    } catch (error) {
        console.error('RabbitMQ connection error:', error);
        throw error;
    }
};

const getChannel = () => channel;

module.exports = { connectToRabbitMQ, getChannel };