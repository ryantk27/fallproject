// server.js

const express = require('express');
const cors = require('cors');
const phishingRoutes = require('./routes/phishingRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/phishing', phishingRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});