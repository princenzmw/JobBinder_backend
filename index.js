const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jobRoutes = require('./routes/jobs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.URI || 'mongodb://localhost:27017/jobdb';

app.use(bodyParser.json());

mongoose
  .connect(url)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/jobs', jobRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
