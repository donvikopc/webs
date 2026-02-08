const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

const submitContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    res.status(201).json({ message: 'Contact submitted successfully', contact: savedContact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const replyToContact = async (req, res) => {
  try {
    const { email, subject, message, id } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({ message: 'Please provide email, subject and message' });
    }

    await sendEmail({
      email,
      subject,
      message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`
    });

    // Optionally update the contact record to indicate a reply was sent
    // For now, we'll just return success
    
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email: ' + error.message });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  replyToContact
};
