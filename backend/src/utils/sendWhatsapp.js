const twilio = require('twilio');
require('dotenv').config(); // make sure this is present!

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const sendWhatsApp = async (toNumber, message) => {
  try {
    console.log('Sending WhatsApp to:', toNumber);
    console.log('Message:', message);
    console.log('Using Twilio credentials:', { accountSid, fromNumber });
    
    // Make sure toNumber has the proper format for WhatsApp
    let fullNumber = toNumber;
    if (!toNumber.startsWith('whatsapp:')) {
      fullNumber = `whatsapp:+91${toNumber}`;
    }
    
    // Send the message
    const result = await client.messages.create({
      from: fromNumber,
      to: fullNumber,
      body: message
    });

    console.log('✅ WhatsApp sent to', toNumber, 'SID:', result.sid);
    return result;
  } catch (error) {
    console.error('❌ WhatsApp failed', error);
    throw error;
  }
};

module.exports = sendWhatsApp;
