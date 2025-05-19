const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
config();
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    // console.log("Headers:", req.headers);
    console.log("Body:", req.body);
 
    console.log("-------------------------------------------------");
    next();
});
app.use('/api', require('./routes/route'));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});