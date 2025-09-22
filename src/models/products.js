import mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price_lb: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    animal: { type: String, required: true },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;