export default () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    // WhatsApp configuration
    whatsapp: {
        verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || '',
        apiKey: process.env.WHATSAPP_API_KEY || '',
        apiUrl: process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v22.0',
        phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    },
    gemini: {
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
    },
    // Gemini configuration
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
    },
});
