const express = require('express');
const router = express.Router();
const uploadResume = require('../middlewares/upload');
const resumeController = require('../controllers/resumeController');

// POST /api/resume/analyze
// Accepts Form-Data: name, role, company, skills, and resume (file)
router.post('/analyze', uploadResume, resumeController.analyzeResume);

module.exports = router;
