const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');
const User = require('../models/User');
const sendWhatsApp = require('../utils/sendWhatsapp');

// Get all reminders for logged-in user (temporarily without auth for testing)
router.get('/', async (req, res) => {
  try {
    const reminders = await Medication.find();
    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new reminder (temporarily without auth for testing)
router.post('/', async (req, res) => {
  try {
    const { 
      name,
      dosage,
      time,
      days,
      frequency,
      startDate,
      endDate,
      notes,
      whatsappEnabled,
      phoneNumber
    } = req.body;

    console.log('Received reminder data:', req.body);

    // For testing, get the first user in the database
    const user = await User.findOne();
    if (!user) {
      return res.status(400).json({ message: 'No users found in system' });
    }
    
    // Create new medication with the found user's ID
    const newMedication = new Medication({
      userId: user._id,
      name,
      dosage,
      time,
      days,
      frequency,
      startDate,
      endDate,
      notes
    });

    // If WhatsApp is enabled, add the phone number
    if (whatsappEnabled && phoneNumber) {
      // Send a test WhatsApp message
      try {
        await sendWhatsApp(phoneNumber, `📱 Test: Reminder setup for ${name} (${dosage}) at ${time[0]}`);
        console.log('✅ Test WhatsApp sent to', phoneNumber);
      } catch (whatsappError) {
        console.error('❌ WhatsApp test failed', whatsappError);
      }
    }

    const savedMedication = await newMedication.save();
    console.log('Medication saved:', savedMedication);
    res.status(201).json(savedMedication);
  } catch (err) {
    console.error('Error saving medication:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update reminder WhatsApp settings
router.patch('/:id/whatsapp', async (req, res) => {
  try {
    const { phoneNumber, enabled } = req.body;
    
    const medication = await Medication.findById(req.params.id);
    if (!medication) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    
    medication.whatsappEnabled = enabled;
    if (phoneNumber) {
      medication.phoneNumber = phoneNumber;
    }
    
    await medication.save();
    res.json(medication);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
