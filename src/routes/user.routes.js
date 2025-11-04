import { Router } from 'express';
import {registerUser, loginUser, getUsers, getUserById, getUserProfile, logoutUser} from '../controllers/user.controller.js'
import { authenticaToken } from '../middleware/auth.js';

logoutUser

const router = Router();

router.post('/register', registerUser);
router.get('/obtenerUsers', authenticaToken, getUsers);
router.post('/login', loginUser);
router.get('/profile', authenticaToken, getUserProfile); 
router.get('/:id', authenticaToken, getUserById);
router.delete('/logout/', authenticaToken,logoutUser);        



   
export default router;  