// Connect to database need mongoose
const mongoose = require("mongoose");

// Create schema before the model
const productSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please enter a product name"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create model
const Product = mongoose.model("Product", productSchema);

// Export model
module.exports = Product;
