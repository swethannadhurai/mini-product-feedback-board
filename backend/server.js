const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//const connectDB = require('./config/db');
//connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


const feedbackRoutes = require('./routes/feedbackRoutes');
app.use('/feedbacks', feedbackRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Mini Product Feedback Board API is running!');
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
