const { getChannel } = require('../config/rabbitmqConfig');

const queueName = 'email_queue';

const sendMessageToQueue = async (message) => {
    try {
        const channel = await getChannel();
        if (!channel) {
            throw new Error('RabbitMQ channel not available');
        }
        await channel.assertQueue(queueName, { durable: true });
        const sent = channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
        if (!sent) {
            throw new Error('Failed to send message to queue');
        }
        console.log(`Message sent to queue: ${message}`);
    } catch (error) {
        console.error('Error sending message to queue:', error);
        throw error;
    }
};

module.exports = { sendMessageToQueue };