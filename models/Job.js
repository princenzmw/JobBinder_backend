const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  description: String,
  contactEmail: String,
  contactPhone: String
});

const jobSchema = new mongoose.Schema({
  id: String,
  title: String,
  type: String,
  description: String,
  location: String,
  salary: String,
  company: companySchema
});

module.exports = mongoose.model('Job', jobSchema);
