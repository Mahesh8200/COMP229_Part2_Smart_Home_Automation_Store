const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new user
router.post('/register', userController.createUser);

// Route for user login
router.post('/login', userController.loginUser);

// Route to get all users (only accessible to admins)
router.get('/', authMiddleware, userController.getAllUsers);

// Route to get a single user by ID
router.get('/:id', authMiddleware, userController.getUserById);

// Route to update a user by ID
router.put('/:id', authMiddleware, userController.updateUserById);

// Route to delete a user by ID
router.delete('/:id', authMiddleware, userController.deleteUserById);

module.exports = router;
