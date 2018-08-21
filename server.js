const express = require('express');
const mongoose = require('mongoose');
const dilemmas = require('./routes/api/dilemmas');
const path = require('path');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

app.use(express.json());

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/dilemmas', dilemmas);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if(!err){
    console.log(`Server started on http://localhost:${port}`);
  } else {
    console.log(`Server failed starting with error: ${err}`);
  }
});