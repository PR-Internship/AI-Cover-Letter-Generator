const { PDFParse } = require('pdf-parse');

async function extractTextFromPDF(buffer) {
  try {
    const parser = new PDFParse(new Uint8Array(buffer));
    const data = await parser.getText();
    return data.text;
  } catch (error) {
    console.error('Error in pdf-parse:', error);
    throw new Error('Failed to parse PDF resume. Please make sure it is a valid PDF document.');
  }
}

module.exports = {
  extractTextFromPDF
};
