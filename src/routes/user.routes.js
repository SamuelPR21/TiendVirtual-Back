import { Router } from 'express';
import {registerUser, loginUser, getUsers, getUserById, getUserProfile} from '../controllers/user.controller.js'
import { authenticaToken } from '../middleware/auth.js';



const router = Router();

router.post('/register', registerUser);
router.get('/obtenerUsers', authenticaToken, getUsers);
router.post('/login', loginUser);
router.get('/profile', authenticaToken, getUserProfile); 
router.get('/:id', authenticaToken, getUserById);        



   
export default router;