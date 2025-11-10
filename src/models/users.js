import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_Number: { type: String },
    address: { type: String },
    product_preference: { type: [String] },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' } 
})


const User = mongoose.model('User', UserSchema);
export default User;