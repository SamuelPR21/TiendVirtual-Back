import { PaymentRequestDTO } from "../DTOs/Payment/paymentRequest.js";
import { PaymentResponseDTO } from "../DTOs/Payment/paymentResponse.js";
import * as paymentService from "../service/payment.service.js";
import { OrderResponseDTO } from "../DTOs/Order/orderResponse.js";

export const checkoutPayment = async (req, res) => {
  try {
    const dto = PaymentRequestDTO.validate(req.body);
    const { payment, order } = await paymentService.processPayment(dto);

    return res.status(201).json({
      payment: PaymentResponseDTO.fromModel(payment),
      order: OrderResponseDTO.fromModel(order),
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al procesar el pago", error: error.message });
  }
};

export const getPaymentForOrder = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentByOrder(req.params.orderId);
    if (!payment)
      return res
        .status(404)
        .json({ message: "No hay pago registrado para este pedido" });

    return res
      .status(200)
      .json(PaymentResponseDTO.fromModel(payment));
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el pago", error: error.message });
  }
};
