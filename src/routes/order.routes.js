import { Router } from 'express';
import {
  createOrder,
  getOrderById,
  getOrdersByUser,
  getOrdersByDateRange,
  updateOrderStatus,
} from '../controllers/order.controller.js';
import { authenticaToken } from '../middleware/auth.js';

const router = Router();

// Todas las rutas protegidas con JWT
router.post('/', authenticaToken, createOrder);
router.get('/:id', authenticaToken, getOrderById);
router.get('/usuario/:userId', authenticaToken, getOrdersByUser);
router.get('/', authenticaToken, getOrdersByDateRange);
router.patch('/:id', authenticaToken, updateOrderStatus);

export default router;
