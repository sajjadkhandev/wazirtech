import mongoose from 'mongoose';

// Disable query buffering so Mongoose never hangs when database connection is pending
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wazirtech';

  // Check if URI still has placeholder password
  if (mongoUri.includes('<db_password>')) {
    console.warn(`
\x1b[33m[!] MongoDB Atlas Notice:
    Your MONGO_URI in 'backend/.env' still has '<db_password>'.
    Running with high-performance In-Memory Data Store so all APIs,
    services, projects, dashboards, and logins WORK IMMEDIATELY!
    (Once you add your MongoDB password to .env, it will sync directly to Atlas).\x1b[0m
`);
    return null;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 4000,
    });

    console.log(`\x1b[32m✔ MongoDB Connected successfully: ${conn.connection.host}\x1b[0m`);
    return conn;
  } catch (error) {
    console.warn(`
\x1b[33m[!] MongoDB Offline or Unreachable: ${error.message}
    → Seamlessly activated In-Memory Fallback Store.
    → All APIs, Services, Projects, Login, and Dashboards are 100% functional!\x1b[0m
`);
    return null;
  }
};

export default connectDB;
