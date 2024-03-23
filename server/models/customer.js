const mongoose = require('mongoose');

const videoStatsSchema = new mongoose.Schema({
  name : String,
  phone : Number
});

const customer = mongoose.model('customers', videoStatsSchema);

module.exports = customer;