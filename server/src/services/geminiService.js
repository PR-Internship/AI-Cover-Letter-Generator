const { GoogleGenerativeAI } = require('@google/generative-ai');

const getGenAIInstance = () => {
  const apiKey = process.env.GEMNAI_API;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please define GEMNAI_API in the environment.');
  }
  return new GoogleGenerativeAI(apiKey);
};

async function generateCoverLetter({ name, role, company, skills, resumeText }) {
  try {
    const genAI = getGenAIInstance();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const hasResume = resumeText && resumeText.trim();
    const resumeSection = hasResume
      ? `EXTRACTED RESUME TEXT:
"""
${resumeText}
"""`
      : `(Note: No resume PDF was uploaded. Rely entirely on the Candidate details and Key Skills listed below.)`;

    const skillsGuideline = hasResume
      ? `Highlight how the candidate's skills ("${skills}") and specific achievements/experience mentioned in the resume text make them a perfect fit.`
      : `Highlight how the candidate's key skills ("${skills}") make them a perfect fit for the "${role}" position.`;

    const prompt = `
You are a top-tier Professional Cover Letter writer.
Write a highly persuasive, customized cover letter that perfectly aligns the candidate's details and skills with their target job role and company.

CANDIDATE AND ROLE DETAILS:
- Candidate Name: ${name}
- Target Job Role: ${role}
- Target Company: ${company}
- Key Skills: ${skills}
- Date: ${today}

${resumeSection}

GUIDELINES:
1. Address the cover letter to the Hiring Manager at "${company}".
2. Express enthusiastic and professional interest in the "${role}" position.
3. ${skillsGuideline}
4. Do NOT output any bracketed placeholders (like "[Date]", "[Company Name]", "[Hiring Manager]"). Fill in all fields dynamically. If some contact info is missing, write it cleanly or omit it naturally without placeholders.
5. Use candidate name "${name}" in the signature.
6. Return the cover letter formatted in clean, standard Markdown (e.g. use proper paragraphs, headers, or bullet points if necessary). Do not include any prefix or code blocks, just return the raw markdown content.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in Gemini Service:', error);
    throw new Error(`Gemini generation failed: ${error.message}`);
  }
}

module.exports = {
  generateCoverLetter
};
