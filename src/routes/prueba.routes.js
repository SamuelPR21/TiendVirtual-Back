import { Router } from 'express';
import {authenticaToken} from '../middleware/auth.js';

const router = Router();

router.get('/', authenticaToken, async (req, res) => {
  try {
    res.json({ message: 'Ruta protegida, acceso concedido' });
  } catch (err) {
    res.status(500).json({ message: 'Error en la ruta protegida' });
  }
})

export default router;
