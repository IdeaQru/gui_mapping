const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Middleware
app.use(express.static('public'));
app.use(express.json());

// CSV Handling
const CSV_PATH = './data/sensor_data.csv';

const writeCSV = (data) => {
  const csvLine = `${new Date().toISOString()},${data.lat},${data.lng},${data.gyroX},${data.gyroY},${data.gyroZ}\n`;
  fs.appendFileSync(CSV_PATH, csvLine);
};

// API Endpoint
app.post('/api/sensor', (req, res) => {
  const sensorData = req.body;
  writeCSV(sensorData);
  io.emit('sensor-update', sensorData);
  res.status(200).send('Data received');
});

// Start Server
http.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
