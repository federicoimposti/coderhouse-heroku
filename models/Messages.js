const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  email: { type: String, required: true, max: 100 },
  date: { type: String, required: true, max: 100 },  
  text: { type: String, required: true, max: 100 },
});

module.exports = new model('Message', messageSchema);