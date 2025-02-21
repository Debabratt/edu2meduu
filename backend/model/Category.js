const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  categoryType: { type: String, required: true },
  userType: { type: String, required: true },
  image: { type: String, default: null },
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;