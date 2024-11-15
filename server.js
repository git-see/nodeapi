const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes since Client to Node APP
app.get("/", (req, res) => {
  res.send("Hello nodeapi");
});

app.get("/blog", (req, res) => {
  res.send("Hello blog, my name is Devtamine");
});

// read all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read one product
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update one product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // We cannot find any product in database
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product not found with ID ${id}` });
    }
    // We found the product
    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product not found with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    // My secret credentials
    "mongodb+srv://*****:******@cluster0.anjbl.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB !");
    app.listen(3000, () => {
      console.log("nodeapi app is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
