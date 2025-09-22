import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    value: { type: Number, required: true },
})

const UserOrderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone_Number: { type: String, required: true },
});

const OrderSchema = new mongoose.Schema({
    total_value: { type: Number, required: true },
    order_date: { type: Date, default: Date.now },
    status: { type: String, required: true },
    products: { type: [OrderItemSchema], required: true },
    user: { type: UserOrderSchema, required: true },
})

const Order = mongoose.model('Order', OrderSchema);
export default Order;