// server/index.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

const PORT = 5000;
const DATA_FILE = './data.json';

app.use(cors());
app.use(express.json());

// Read count
// In your backend (server.js)
app.get('/api/signup-count', (req, res) => {
  console.log('Fetching signup count...');
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).json({ error: 'Failed to read file' });
    }
    const parsed = JSON.parse(data || '{}');
    const count = parsed.count || 0;
    console.log('Fetched count:', count);
    res.json({ count });
  });
});

app.post('/api/increment-signup', (req, res) => {
  console.log('Incrementing signup count...');
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    let parsed = {};
    if (!err && data) parsed = JSON.parse(data);

    const newCount = (parsed.count || 0) + 1;
    fs.writeFile(DATA_FILE, JSON.stringify({ count: newCount }), err => {
      if (err) {
        console.error('Error writing data file:', err);
        return res.status(500).json({ error: 'Failed to write file' });
      }
      console.log('New count after increment:', newCount);
      res.json({ count: newCount });
    });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
