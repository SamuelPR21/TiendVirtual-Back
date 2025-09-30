import { Router } from 'express';
import mongoose from 'mongoose';
import Product from '../models/products.js';
import {authenticaToken} from '../middleware/auth.js';


const router = Router();

router.get('/', authenticaToken, async (req, res) => {
  try {
    const { animal } = req.query;
    const filter = {};
    if (animal) {
      filter.animal = new RegExp(`^${animal}$`, 'i');
    }
    const products = await Product.find(filter).lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error listando productos' });
  }
});

router.get('/animal/:animal', authenticaToken, async (req, res) => {
  try {
    const { animal } = req.params;
    const products = await Product.find({
      animal: new RegExp(`^${animal}$`, 'i'),
    }).lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error filtrando productos' });
  }
});

router.get('/:id', authenticaToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const product = await Product.findById(id).lean();
    if (!product) return res.status(404).json({ message: 'No encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo producto' });
  }
});

export default router;
