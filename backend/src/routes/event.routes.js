const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');

// Get all events for a user
router.get('/', async (req, res) => {
  try {
    // Find all events without requiring a specific user
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get events by type (upcoming or past)
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params; // 'upcoming' or 'past'
    
    const now = new Date();
    let query = {};
    
    if (type === 'upcoming') {
      query.date = { $gte: now };
    } else if (type === 'past') {
      query.date = { $lt: now };
    } else {
      return res.status(400).json({ message: 'Invalid event type. Use "upcoming" or "past"' });
    }
    
    const events = await Event.find(query).sort({ date: type === 'upcoming' ? 1 : -1 });
    res.json(events);
  } catch (err) {
    console.error(`Error fetching ${req.params.type} events:`, err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  try {
    const { 
      title,
      type,
      date,
      time,
      location,
      description,
      reminderEnabled
    } = req.body;

    console.log('Received event data:', req.body);

    // Create new event without requiring a user
    const newEvent = new Event({
      userId: '000000000000000000000000', // Dummy ObjectId for testing
      title,
      type,
      date: new Date(date),
      time,
      location,
      description,
      reminderEnabled
    });

    const savedEvent = await newEvent.save();
    console.log('Event saved:', savedEvent);
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: req.body },
      { new: true }
    );
    
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(updatedEvent);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Mark event as completed
router.patch('/:id/complete', async (req, res) => {
  try {
    const eventId = req.params.id;
    const { completed } = req.body;
    
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: { completed } },
      { new: true }
    );
    
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(updatedEvent);
  } catch (err) {
    console.error('Error marking event as completed:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 