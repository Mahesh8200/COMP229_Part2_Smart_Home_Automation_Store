const Product = require('../models/Product');

// Controller function to create a new product
const createProduct = async (req, res) => {
  try {
    // Extract product data from the request body
    const { name, description, price } = req.body;

    // Create a new product document in the database
    const product = await Product.create({ name, description, price });

    // Respond with the created product
    res.status(201).json(product);
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
};

// Controller function to fetch all products
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Respond with the list of products
    res.status(200).json(products);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to fetch a single product by ID
const getProductById = async (req, res) => {
  try {
    // Extract product ID from the request parameters
    const productId = req.params.id;

    // Find the product by ID in the database
    const product = await Product.findById(productId);

    // If product is not found, respond with 404 Not Found
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with the found product
    res.status(200).json(product);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to update a product by ID
const updateProductById = async (req, res) => {
  try {
    // Extract product ID and updated data from the request body
    const productId = req.params.id;
    const { name, description, price } = req.body;

    // Find the product by ID and update it in the database
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, description, price }, { new: true });

    // If product is not found, respond with 404 Not Found
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with the updated product
    res.status(200).json(updatedProduct);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to delete a product by ID
const deleteProductById = async (req, res) => {
  try {
    // Extract product ID from the request parameters
    const productId = req.params.id;

    // Find the product by ID and delete it from the database
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // If product is not found, respond with 404 Not Found
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server Error' });
  }
};

// Export controller functions
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
