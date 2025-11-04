import Order from '../models/orders.js';

export const createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

export const getOrderById = async (id) => {
  return await Order.findById(id);
};

export const getOrdersByUser = async (userId) => {
  return await Order.find({ 'user.user_id': userId });
};

export const getOrdersByDateRange = async (startDate, endDate) => {
  return await Order.find({
    order_date: { $gte: new Date(startDate), $lte: new Date(endDate) },
  });
};

export const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};
