const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
  apiKey: { type: String, required: true, unique: true },
  limit: { type: Number, required: true },
  usage: { type: Number, default: 0 }
}, { _id: false }); 

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = ApiKey;
