// src/routes/order.routes.js
import { Router } from 'express';
import {
  createOrder,
  getOrderById,
  getOrdersByUser,
  getOrdersByDateRange,
  updateOrderStatus,
  getAllOrders,
} from '../controllers/order.controller.js';
import { authenticaToken } from '../middleware/auth.js';

const router = Router();

// Todas las rutas protegidas con JWT
router.post('/', authenticaToken, createOrder);

// rutas MÁS específicas primero
router.get('/usuario/:userId', authenticaToken, getOrdersByUser);
router.get('/all', authenticaToken, getAllOrders);
router.get('/', authenticaToken, getOrdersByDateRange);

// al final la genérica por id
router.get('/:id', authenticaToken, getOrderById);

router.patch('/:id', authenticaToken, updateOrderStatus);

export default router;
