import Users from '../models/users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserResponse } from '../DTOs/User/userResponse.js'


export const registerUser = async (dto) => {
    try {
        const existingUser = await Users.findOne({ email: dto.email });
        if (existingUser) {
            throw new Error('El correo ya está en uso');
        }

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

        return { message: 'Usuario registrado', user: userResponse };
    } catch (err) {
        if (err.code === 11000) {
            throw new Error('El correo ya está en uso');
        }
        throw new Error('Error registrando usuario');
    }
}

export const loginUser = async (dto) => {
    const user = await Users.findOne({ email: dto.email });
    if (!user) {
        throw new Error('Credenciales inválidas');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Credenciales inválidas');
    }

    return jwt.sign(
                { userId: user._id, email: user.email, name: user.name, product_preference: user.product_preference },
                process.env.JWT_SECRET,
                { expiresIn: '3h' }
            );
}

export const getUsers = async () => {
    const users = await Users.find().lean();
    return users.map(user => new UserResponse({
        id: user._id,
        name: user.name,
        email: user.email,
        phone_Number: user.phone_Number,
        address: user.address,
        product_preference: user.product_preference,
      }));
}

export const getUserById = async (id) => {
    const user = await Users.findById(id).lean();
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return new UserResponse({
        id: user._id,
        name: user.name,
        email: user.email,
        phone_Number: user.phone_Number,
        address: user.address,
        product_preference: user.product_preference,
      });
}

export const getProfile = async (userId) => {
    
    const user = await Users.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
  
    return new UserResponse({
      id: user._id,
      name: user.name,
      email: user.email,
      phone_Number: user.phone_Number,
      address: user.address,
      product_preference: user.product_preference,
    });
}
