const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const timers = [];

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

app.get('/api/timers', (req, res) => {
  res.json(timers);
});


app.post('/api/timers', (req, res) => {
  const { name, duration } = req.body;
  const id = uuidv4();
  const newTimer = { id, name, duration };

  // Add new timer to the database
  timers.push(newTimer);

  // Return created timer to client
  res.status(201).json(newTimer);
});

app.listen(3000, () => console.log('Server started on port 3000'));