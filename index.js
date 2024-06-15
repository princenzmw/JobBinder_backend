const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;
const url = process.env.URI;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(url)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
