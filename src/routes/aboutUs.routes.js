import { Router } from 'express';
import { createAboutUs, getAboutUs, getAboutUsById, updateAboutUs, deleteAboutUs} from '../controllers/aboutUs.controller.js';
import {authenticaToken} from '../middleware/auth.js';


const router = Router();



router.post('/createAboutUs', authenticaToken, createAboutUs)
router.get('/all', authenticaToken, getAboutUs)
router.get('/:id', authenticaToken, getAboutUsById)
router.patch('/:id', authenticaToken, updateAboutUs)
router.delete('/delete/:id', authenticaToken, deleteAboutUs)

export default router;