const express = require('express');
const cors = require('cors');
const connect = require('./Config/server');
const adminRouter = require('./Routes/AdminRouter');
const razorpayRouter = require('./Routes/RazorpayRouterSimple');
require('dotenv').config();

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date() });
});

app.use('/', adminRouter);
app.use('/', razorpayRouter);

const PORT = process.env.PORT || 5010;

// ✅ Just call connect() — no .then()
connect();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
