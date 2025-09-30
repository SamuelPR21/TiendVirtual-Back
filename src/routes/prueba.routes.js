//Pruba de routa con token
import { Router } from 'express';
import mongoose from 'mongoose';
import {authenticaToken} from '../middleware/auth.js';

const router = Router();

router.get('/prueba', authenticaToken, async (req, res) => {
  try {
    res.json({ message: 'Ruta protegida, acceso concedido' });
  } catch (err) {
    res.status(500).json({ message: 'Error en la ruta protegida' });
  }
})

export default router;
