const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Roadmap = require('../models/Roadmap');
const { generateRoadmap } = require('../services/gemini');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Generate new roadmap (PROTECTED)
router.post('/generate', auth, async (req, res) => {
  try {
    const userData = req.body;
    const roadmapData = await generateRoadmap(userData);
    const id = uuidv4();

    const roadmap = await Roadmap.create({
      roadmapId: id,
      userData,
      roadmap: roadmapData,
      userId: req.userId
    });

    res.json({ 
      id, 
      roadmap: roadmap.roadmap,
      year: roadmap.userData.year,
      skills: roadmap.userData.skills,
      companies: roadmap.userData.companies
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get roadmap by ID (OPTIONAL: keep public)
router.get('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ roadmapId: req.params.id });
    if (!roadmap) return res.status(404).json({ error: 'Roadmap not found' });
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update progress (PROTECTED)
router.post('/:id/update', auth, async (req, res) => {
  try {
    const { stage: weekIndex, completion_rate: progress, date: note } = req.body;
    
    const roadmap = await Roadmap.findOne({ roadmapId: req.params.id });
    if (!roadmap) return res.status(404).json({ error: 'Roadmap not found' });

    roadmap.progressLogs.push({ 
      weekIndex, 
      progress, 
      note: note || '', 
      timestamp: new Date() 
    });

    if (progress === 0.5) {
      const updatedRoadmap = await generateRoadmap({
        ...roadmap.userData,
        weeks: roadmap.userData.weeks,
        progressLogs: roadmap.progressLogs
      });
      roadmap.roadmap = updatedRoadmap;
    }

    await roadmap.save();
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
