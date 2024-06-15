const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Get all applications for a job
router.get('/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new application
router.post('/', async (req, res) => {
  const application = new Application(req.body);
  try {
    const newApplication = await application.save();
    res.status(201).json(newApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
