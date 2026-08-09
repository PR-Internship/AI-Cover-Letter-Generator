const pdfService = require('../services/pdfService');
const geminiService = require('../services/geminiService');

async function analyzeResume(req, res, next) {
  try {
    const { name, role, company, skills } = req.body;

    if (!name || !name.trim()) {
      throw new Error('Candidate name is required.');
    }
    if (!role || !role.trim()) {
      throw new Error('Target job role is required.');
    }
    if (!company || !company.trim()) {
      throw new Error('Target company is required.');
    }
    if (!skills || !skills.trim()) {
      throw new Error('Key skills are required.');
    }
    let resumeText = '';
    if (req.file) {
      console.log(`[Controller] Resume file uploaded: ${req.file.originalname}`);
      resumeText = await pdfService.extractTextFromPDF(req.file.buffer);
    } else {
      console.log('[Controller] No resume file uploaded, generating using form details only');
    }

    const coverLetter = await geminiService.generateCoverLetter({
      name: name.trim(),
      role: role.trim(),
      company: company.trim(),
      skills: skills.trim(),
      resumeText
    });

    console.log(`[Controller] Cover letter successfully generated for ${name}`);

    return res.status(200).json({
      success: true,
      coverLetter
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  analyzeResume
};
