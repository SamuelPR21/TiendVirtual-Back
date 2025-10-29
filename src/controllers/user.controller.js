import * as userService from '../service/user.service.js';
import {UserRegisterRequest} from  '../DTOs/User/userRequest.js'
import {UserLoginRequest} from  '../DTOs/Login/loginRequest.js'

export const registerUser = async (req, res) => {
    try {
        const dto = new UserRegisterRequest(req.body);
        const result = await userService.registerUser(dto);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const dto = new UserLoginRequest(req.body);
        const token = await userService.loginUser(dto);
        res
            .cookie('auth_token', token, {
                httpOnly: true,         
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'strict',     
                maxAge: 60 * 60 * 1000  
            })
            .header('Authorization', token)
            .json({ message: 'Login exitoso'});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error listando usuarios', error: err.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error obteniendo usuario', error: err.message });
    }
}

export const getUserProfile = async (req, res) => {
    try {
      const userProfile = await userService.getProfile(req.user.userId);
      res.json({ user: userProfile });
    } catch (err) {
      res.status(404).json({ message: err.message || 'Error al obtener perfil' });
    }
  };


export const logoutUser = async (req, res) => {
    try{
        const userId = req.user.userId;
        const result = await userService.logoutUser(userId);
        res.clearCookie('auth_token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        })

        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ message: 'Error al hacer logout', error: err.message });
    }
}