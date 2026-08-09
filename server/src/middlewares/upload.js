const multer = require('multer');

// Use memory storage to avoid writing temporary files to disk
const storage = multer.memoryStorage();

// Validate file type (only allow PDF)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Please upload a PDF resume.'), false);
  }
};

// Configure Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB limit
  }
});

// Middleware for parsing single file field named 'resume'
const uploadResume = upload.single('resume');

module.exports = uploadResume;
