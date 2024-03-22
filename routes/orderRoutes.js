const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new order
router.post('/', authMiddleware, orderController.createOrder);

// Route to get all orders
router.get('/', authMiddleware, orderController.getAllOrders);

// Route to get a single order by ID
router.get('/:id', authMiddleware, orderController.getOrderById);

// Route to update an order by ID
router.put('/:id', authMiddleware, orderController.updateOrderById);

// Route to delete an order by ID
router.delete('/:id', authMiddleware, orderController.deleteOrderById);

module.exports = router;
