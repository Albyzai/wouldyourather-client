const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const dilemmas = require('./routes/api/dilemmas');
const users = require('./routes/api/users');
const comments = require('./routes/api/comments');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

app.use(express.json());

// Connect to Mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Passport middleware
app.use(cookieParser());
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/dilemmas', dilemmas);
app.use('/api/users', users);
app.use('/api/comments', comments);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(express.static('client/public'));

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server started on http://localhost:${port}`);
  } else {
    console.log(`Server failed starting with error: ${err}`);
  }
});
