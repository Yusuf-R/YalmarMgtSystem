require('dotenv').config({
  path: '../server/.env',
});
const express = require('express');
const logger = require('morgan');
const multer = require('multer');
const router = require('./routes/router');
const redisClient = require('./utils/redis');
const dbClient = require('./utils/db');

// const upload = multer({ dest: 'uploads/', fileField: 'file' });
const upload = multer();
const app = express();
const port = process.env.EXPRESS_PORT || 5000;

// middleware
app.use(upload.single('file')); // Place this before your routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(router);
app.use(logger('dev'));

async function startServer() {
  const redisStatus = await redisClient.isAlive();
  if (!redisStatus) {
    console.error('Failed to initialize Redis');
    process.exit(1);
  }
  try {
    // ensure DB Conn is ready
    if (await dbClient.isAlive()) {
      console.log('Database connection established successfully!');
    } else {
      console.error('Database connection failed!');
      process.exit(1);
    }
    // Graceful Shutdown
    process.on('SIGINT', () => {
      console.log('\nReceived SIGINT (signal interrupt) . Shutting down gracefully.');
      // Perform cleanup tasks if needed
      process.exit(0);
    });
    // Start the server
    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error({
      info: 'Server failed to start',
      error,
      details: error.message,
    });
    process.exit(1);
  }
}

startServer();
