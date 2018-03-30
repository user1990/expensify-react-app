const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware
app.use(logger('dev'));
app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
