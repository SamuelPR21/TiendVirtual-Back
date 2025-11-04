export class OrderResponseDTO {
  constructor(order) {
    this.id = order._id;
    this.total_value = order.total_value;
    this.status = order.status;
    this.order_date = order.order_date;
    this.products = order.products;
    this.user = order.user;
  }

  static fromModel(order) {
    return new OrderResponseDTO(order);
  }
}
