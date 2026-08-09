const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Apply global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Backend service is online.' });
});

// Register routes
app.use('/api/resume', resumeRoutes);

// Register global error handler (should be final middleware)
app.use(errorHandler);

module.exports = app;
