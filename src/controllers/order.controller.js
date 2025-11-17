import * as orderService from '../service/order.service.js';
import { OrderRequestDTO } from '../DTOs/Order/orderRequest.js';
import { OrderResponseDTO } from '../DTOs/Order/orderResponse.js';

/**
 * 🧾 Crear un nuevo pedido
 * @route POST /pedidos
 */
export const createOrder = async (req, res) => {
  try {
    // Validar y transformar la entrada usando el DTO
    const orderData = OrderRequestDTO.validate(req.body);
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(OrderResponseDTO.fromModel(newOrder));
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el pedido', error: error.message });
  }
};

/**
 * 🔍 Obtener pedido por ID
 * @route GET /pedidos/:id
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.status(200).json(OrderResponseDTO.fromModel(order));
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedido', error: error.message });
  }
};

/**
 * 👤 Listar pedidos por usuario
 * @route GET /pedidos/usuario/:userId
 */
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUser(req.params.userId);
    const response = orders.map(order => OrderResponseDTO.fromModel(order));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos del usuario', error: error.message });
  }
};

/**
 * 📅 Listar pedidos por rango de fechas
 * @route GET /pedidos?startDate=2024-01-01&endDate=2024-12-31
 */
export const getOrdersByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate)
      return res.status(400).json({ message: 'Debe proporcionar startDate y endDate' });

    const orders = await orderService.getOrdersByDateRange(startDate, endDate);
    const response = orders.map(order => OrderResponseDTO.fromModel(order));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos por fecha', error: error.message });
  }
};

/**
 * 🔄 Actualizar estado de pedido
 * @route PATCH /pedidos/:id
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Debe indicar el nuevo estado' });

    const updatedOrder = await orderService.updateOrderStatus(req.params.id, status);
    if (!updatedOrder) return res.status(404).json({ message: 'Pedido no encontrado' });

    res.status(200).json(OrderResponseDTO.fromModel(updatedOrder));
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar estado del pedido', error: error.message });
  }
};

/**
 * 📋 Listar todos los pedidos (uso administrativo)
 * @route GET /pedidos/all
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    const response = orders.map((o) => OrderResponseDTO.fromModel(o));
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener pedidos", error: error.message });
  }
};
