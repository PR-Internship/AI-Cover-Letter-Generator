require('dotenv').config();
const app = require('./src/app');

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`[Server] Listening on port ${PORT}`);
  });
}

module.exports = app;
