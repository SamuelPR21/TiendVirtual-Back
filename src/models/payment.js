import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    pedidio_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    payment_method: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    payment_date: { type: Date, default: Date.now },

})


const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;