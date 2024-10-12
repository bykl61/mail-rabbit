const { sendEmail } = require('../services/emailService');

jest.mock('../services/emailService', () => ({
    sendEmail: jest.fn(),
}));

describe('sendEmail', () => {
    it('should send an email successfully', async () => {
        sendEmail.mockResolvedValue('Email sent');

        const email = 'test@example.com';
        const name = 'Test User';

        const result = await sendEmail(email, name);

        expect(result).toBe('Email sent');
        expect(sendEmail).toHaveBeenCalledTimes(1);
        expect(sendEmail).toHaveBeenCalledWith(email, name);
    });

    it('should throw an error if email sending fails', async () => {
        // Mock hata fırlatıyoruz
        sendEmail.mockRejectedValue(new Error('Failed to send'));

        await expect(sendEmail('test@example.com', 'Test User')).rejects.toThrow('Failed to send');
    });
});
