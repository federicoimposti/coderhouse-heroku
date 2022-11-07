const express = require('express');
const productsRouter = express.Router();

const controller = require('../controllers/products');

productsRouter.get("/", async (req, res) => {
  const response = await controller.getAll();
  res.render('pages/productForm', { products: response });
});

productsRouter.post("/", (req, res) => {
  controller.save(req.body);
  res.redirect("/");
});

module.exports = productsRouter;