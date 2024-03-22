const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller function to create a new user
const createUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Create a new user document in the database
    const user = await User.create({ username, email, password });

    // Respond with the created user
    res.status(201).json(user);
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
};

// Controller function to handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role // Optional: Include user role in payload
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Controller function to fetch all users
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to fetch a single user by ID
const getUserById = async (req, res) => {
  try {
    // Extract user ID from the request parameters
    const userId = req.params.id;

    // Find the user by ID in the database
    const user = await User.findById(userId);

    // If user is not found, respond with 404 Not Found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the found user
    res.status(200).json(user);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to update a user by ID
const updateUserById = async (req, res) => {
  try {
    // Extract user ID and updated data from the request body
    const userId = req.params.id;
    const { username, email, password } = req.body;

    // Find the user by ID and update it in the database
    const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password }, { new: true });

    // If user is not found, respond with 404 Not Found
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    // Extract user ID from the request parameters
    const userId = req.params.id;

    // Find the user by ID and delete it from the database
    const deletedUser = await User.findByIdAndDelete(userId);

    // If user is not found, respond with 404 Not Found
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Server Error' });
  }
};

// Export controller functions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser
};
