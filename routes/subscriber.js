const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Subscriber = require('../models/subscriber');
const { sendWelcomeEmail } = require('../utils/emailconfig');

router.post('/subscribe', [check('email').isEmail()], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        const { email } = req.body;

        // Check if subscriber exists
        let subscriber = await Subscriber.findOne({ email });
        if (subscriber) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        // Create new subscriber
        subscriber = new Subscriber({ email });
        await subscriber.save();
        
        // Send welcome email
        try {
            await sendWelcomeEmail(email);
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
        }
        
        res.status(201).json({ message: 'Successfully subscribed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/unsubscribe', [check('email').isEmail()], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        const { email } = req.body;
        const subscriber = await Subscriber.findOne({ email });

        if (!subscriber) {
            return res.status(404).json({ message: 'Email not found' });
        }

        subscriber.isActive = false;
        await subscriber.save();

        res.json({ message: 'Successfully unsubscribed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;