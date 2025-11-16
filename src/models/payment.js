import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: { type: Number, required: true },

  // Datos simulados de tarjeta (no reales)
  card_holder: { type: String, required: true },
  card_last4: { type: String, required: true },
  card_brand: { type: String, required: true },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "DECLINED"],
    default: "PENDING",
  },
  created_at: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
