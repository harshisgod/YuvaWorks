// OAuth Configuration
const oauthConfig = {
    google: {
        clientId: '52657429929-bs3uuieuo4pmm8kf7afo8788kbvrf68l.apps.googleusercontent.com',
        redirectUri: 'https://yuva-works.vercel.app/auth/google/callback&', // Changed to local development URL
        scope: 'email profile'
    },
    facebook: {
        appId: '1210800050754620',
        redirectUri: 'https://yuva-works.vercel.app/auth/facebook/callback',
        scope: 'email,public_profile'
    },
    linkedin: {
        clientId: 'YOUR_LINKEDIN_CLIENT_ID',
        redirectUri: 'YOUR_REDIRECT_URI',
        scope: 'r_liteprofile r_emailaddress'
    }
};

// OAuth login functions
function handleGoogleLogin() {
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${oauthConfig.google.clientId}&redirect_uri=${oauthConfig.google.redirectUri}&response_type=token&scope=${oauthConfig.google.scope}`;
    window.location.href = googleLoginUrl;
}

function handleFacebookLogin() {
    const facebookLoginUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${oauthConfig.facebook.appId}&redirect_uri=${oauthConfig.facebook.redirectUri}&response_type=token&scope=${oauthConfig.facebook.scope}`;
    window.location.href = facebookLoginUrl;
}

function handleLinkedinLogin() {
    const linkedinLoginUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${oauthConfig.linkedin.clientId}&redirect_uri=${oauthConfig.linkedin.redirectUri}&scope=${encodeURIComponent(oauthConfig.linkedin.scope)}`;
    window.location.href = linkedinLoginUrl;
}