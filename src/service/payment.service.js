import Payment from "../models/payment.js";
import Order from "../models/orders.js";

const detectBrand = (card_number) => {
  if (/^4/.test(card_number)) return "VISA";
  if (/^(5[1-5])/.test(card_number)) return "MASTERCARD";
  if (/^3[47]/.test(card_number)) return "AMEX";
  return "CARD";
};

export const processPayment = async (paymentData) => {
  const { order_id, amount, card_holder, card_number } = paymentData;

  const order = await Order.findById(order_id);
  if (!order) throw new Error("Pedido no encontrado");

  if (order.total_value !== amount) {
    throw new Error("El monto no coincide con el total del pedido");
  }

  if (order.status !== "PENDING") {
    throw new Error("El pedido ya fue procesado o no está en estado PENDING");
  }

  const last4 = card_number.slice(-4);
  const brand = detectBrand(card_number);

  const payment = new Payment({
    order_id,
    amount,
    card_holder,
    card_last4: last4,
    card_brand: brand,
    status: "APPROVED", // en una simulación lo marcamos aprobado
  });

  const savedPayment = await payment.save();

  order.status = "PAID";
  await order.save();

  return { payment: savedPayment, order };
};

export const getPaymentByOrder = async (orderId) => {
  return await Payment.findOne({ order_id: orderId });
};
