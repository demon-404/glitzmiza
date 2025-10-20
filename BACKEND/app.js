const express = require('express');
const cors = require('cors');
const connect = require('./Config/server'); // fixed typo: 'connet' → 'connect'
const adminRouter = require('./Routes/AdminRouter');
const razorpayRouter = require('./Routes/RazorpayRouterSimple');
require('dotenv').config();

const app = express();

// ✅ Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// ✅ Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date() });
});

// ✅ Mount routers
app.use('/', adminRouter);
app.use('/', razorpayRouter);

// ✅ Ensure PORT works correctly in all environments
const PORT = process.env.PORT || 5010;

// ✅ Connect to MongoDB before starting server
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
  });
