const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Import routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
