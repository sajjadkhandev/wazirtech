import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to Database and start server
const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`\x1b[36m🚀 WazirTech Backend Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}\x1b[0m`);
    console.log(`\x1b[36m👉 API Base: http://localhost:${PORT}/api\x1b[0m`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
  });
};

startServer();
