import { Router } from 'express';
import {registerUser, loginUser, getUsers} from '../controllers/user.controller.js'
import { authenticaToken } from '../middleware/auth.js';



const router = Router();

router.post('/register', registerUser);
router.get('/obtenerUsers', authenticaToken, getUsers);
router.post('/login', loginUser);


export default router;