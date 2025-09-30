import { Router } from 'express';
import bcrypt from 'bcryptjs';
import Users from '../models/users.js';
import { UserRegisterRequest } from '../DTOs/User/userRequest.js';
import { UserResponse } from '../DTOs/User/userResponse.js';
import {UserLoginRequest} from '../DTOs/Login/loginRequest.js'
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';


const router = Router();

router.post('/register', async (req, res) => {
    
    try{
        const dto = new UserRegisterRequest(req.body);
        const hanshedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = new Users({
            name: dto.name,
            email: dto.email,
            password: hanshedPassword,
            phone_Number: dto.phone_Number,
            address: dto.address,
            product_preference: dto.product_preference,
          });

        const savedUser = await newUser.save();
        const userResponse = new UserResponse({
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            phone_Number: savedUser.phone_Number,
            address: savedUser.address,
            product_preference: savedUser.product_preference,
          });

          res.status(201).json({message: 'Usuario registrado', user: userResponse, user:userResponse});
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'El correo ya está en uso' });
        }
        res.status(500).json({ message: 'Error registrando usuario' });
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await Users.find().lean();
        const userResponses = users.map(user => new UserResponse({
            id: user._id,
            name: user.name,
            email: user.email,
            phone_Number: user.phone_Number,
            address: user.address,
            product_preference: user.product_preference,
          }));
        res.json(userResponses);
    } catch (err) {
        res.status(500).json({ message: 'Error listando usuarios' });
    }
})


router.post('/login', async (req, res) => {
    try {
      const dto = new UserLoginRequest(req.body);
  
      // 👀 Debug temporal
      console.log("📩 Body recibido:", req.body);
      console.log("📩 DTO creado:", dto);
  
      const user = await Users.findOne({ email: dto.email });
      if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }
  
      console.log("✅ Usuario encontrado:", user.email);
  
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      console.log("🔑 Password válido:", isPasswordValid);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }
  
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET no está definido en el .env");
      }
  
      const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name, product_preference: user.product_preference },
        process.env.JWT_SECRET,
        { expiresIn: '3h' }
      );
  
      return res
        .header('Authorization', `${token}`)
        .status(200)
        .json({ message: 'Login exitoso' });
  
    } catch (err) {
      console.error("❌ Error en login:", err);
      res.status(500).json({ message: 'Error en el login', error: err.message });
    }
  });
  
  

export default router;