const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bannerRoutes = require('./routes/bannerRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/banner', bannerRoutes);


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
