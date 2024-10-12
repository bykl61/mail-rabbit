const { getChannel } = require('../config/rabbitmqConfig');
const { sendEmail } = require('../services/emailService');
const e = require("express");

const queueName = 'email_queue';

const startEmailWorker = async () => {
    try {
        const channel = await getChannel();
        await channel.assertQueue(queueName, { durable: true });
        console.log('Email worker started, waiting for messages...');

        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                try {
                    const { email, name } = JSON.parse(msg.content.toString());
                    await sendEmail(email, name);
                    console.log(`Email sent to ${email}`);
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error processing message:', error);
                    channel.nack(msg, false, true);
                }
            }
        });
    } catch (error) {
        console.error('Error starting email worker:', error);
        throw error;
    }
};

module.exports = { startEmailWorker };