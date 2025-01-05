const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

const sendWelcomeEmail = async (subscriberEmail) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: subscriberEmail,
            subject: 'Welcome to Our Newsletter!',
            html: `
                <h1>Welcome to Our Newsletter!</h1>
                <p>Thank you for subscribing to our newsletter.</p>
                <p>We're excited to share our updates with you!</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw error;
    }
};

module.exports = { sendWelcomeEmail };