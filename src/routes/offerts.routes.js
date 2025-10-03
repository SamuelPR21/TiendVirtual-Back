import { Router } from 'express';
import {authenticaToken} from '../middleware/auth.js';
import {createOffert, getOfferts, getOffertByProductId, deleteOffertById, updateOffert } from '../controllers/offert.controller.js'


const router = Router();

router.post ('/create', authenticaToken, createOffert);

router.get('/getOfferts', authenticaToken, getOfferts)

router.get('/product/:product_id', authenticaToken, getOffertByProductId)

router.delete('/:id', authenticaToken, deleteOffertById)

router.patch('/:id', authenticaToken, updateOffert)

export default router;