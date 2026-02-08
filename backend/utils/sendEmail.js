const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  // For production, you would use a real service like SendGrid, Mailgun, or Gmail
  // For now, we'll try to use environment variables, or fallback to a test account if needed
  
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail', 
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'Donvik Admin'} <${process.env.FROM_EMAIL || 'noreply@donvik.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
