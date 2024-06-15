const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs with optional query parameters
router.get('/', async (req, res) => {
  try {
    const { _limit, _sort, _order } = req.query;
    let query = Job.find();

    // Apply sorting if specified
    if (_sort) {
      const sortOrder = _order === 'desc' ? -1 : 1;
      query = query.sort({ [_sort]: sortOrder });
    }

    // Apply limit if specified
    if (_limit) {
      query = query.limit(parseInt(_limit));
    }

    const jobs = await query.exec();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all jobs
// router.get('/', async (req, res) => {
//   try {
//     const jobs = await Job.find();
//     res.json(jobs);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Get a job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findOne({ id: req.params.id });
    if (job == null) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new job
router.post('/', async (req, res) => {
  const job = new Job(req.body);
  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a job
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true
    });
    if (job == null) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ id: req.params.id });
    if (job == null) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
