const { sendMessageToQueue } = require('../queues/emailQueue');

const sendEmailController = async (req, res) => {
    try {
        const { email, name } = req.body;

        if (!email || !name) {
            return res.status(400).send('Email and name are required');
        }

        const message = JSON.stringify({ email, name });
        await sendMessageToQueue(message);

        res.send('Email queued for delivery');
    } catch (error) {
        console.error('Error in sendEmailController:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { sendEmailController };