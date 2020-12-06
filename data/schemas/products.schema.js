const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  quantity: { type: Number, required: true, min: 0 },
  isActive: { type: Boolean, required: true, default: true },
});

mongoose.model("Product", productSchema);
