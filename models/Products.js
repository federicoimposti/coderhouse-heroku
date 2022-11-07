const { Schema, model } = require('mongoose');

const productsSchema = new Schema({
  title: {type: String, required: true},
  thumbnail: {type: String, required: true},
  price: {type: String, required: true, default: 0},
});

module.exports = new model('products', productsSchema);