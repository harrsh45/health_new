// src/app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes'); // ✅ make sure this is a function
const medRoutes = require('./routes/med.routes');   // ✅ same here
const reminderRoutes = require('./routes/reminder.routes');
const eventRoutes = require('./routes/event.routes'); // Add event routes
const morgan = require('morgan');
const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://172.25.160.1:8080');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api/meds', medRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/events', eventRoutes); // Add event routes

app.get('/', (req, res) => {
  res.send('Eldermed API is running 🚀');
});

module.exports = app;
