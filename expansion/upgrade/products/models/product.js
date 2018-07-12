const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product Schema
const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  keywords: {
    type: String
  },
  author: {
    type: String
  },
  sorting: {
    type: Number
  },
  color: [
    {
      type: String
    }
  ],
  sizes: [
    {
      type: String
    }
  ],
  printfile: {
    type: String
  },
  productType: {
    type: String
  },
  status: {
    type: String,
    default: "public"
  },
  allowReviews: {
    type: Boolean,
    default: true
  }
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
