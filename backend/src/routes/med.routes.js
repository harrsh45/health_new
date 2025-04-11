const express = require('express');
const router = express.Router();
const {
  addMedication,
  getMedicationsByUser,
  getMedsForCaretaker, // ✅ Correct name
} = require('../controllers/med.controller');
const authMiddleware = require('../middleware/auth.middleware');

// POST: Add medication
router.post('/', addMedication);

// GET: Get all meds for a specific user by ID
router.get('/user/:userId', getMedicationsByUser);

// GET: Get all meds for patients linked to the logged-in caretaker
router.get('/caretaker', authMiddleware, getMedsForCaretaker); // ✅ Correct name

module.exports = router;
