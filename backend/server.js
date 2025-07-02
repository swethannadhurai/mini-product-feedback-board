const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

//const connectDB = require('./config/db');
//connectDB();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://elegant-dango-a46668.netlify.app'],
  credentials: true,
}));
app.use(express.json());



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


app.use('/feedbacks', feedbackRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Mini Product Feedback Board API is running!');
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
