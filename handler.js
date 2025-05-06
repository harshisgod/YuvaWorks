const express = require('express');
const router = express.Router();
const authConfig = require('../config/auth');

// Google OAuth callback handler
router.get('/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.redirect('/signup.html?error=auth_failed');
    }

    try {
        // Redirect to home page after successful authentication
        res.redirect('/home.html');
    } catch (error) {
        console.error('Authentication error:', error);
        res.redirect('/signup.html?error=auth_failed');
    }
});

module.exports = router;
