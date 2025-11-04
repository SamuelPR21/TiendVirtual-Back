export class OrderRequestDTO {
  constructor({ total_value, status, products, user }) {
    this.total_value = total_value;
    this.status = status;
    this.products = products;
    this.user = user;
  }

  static validate(data) {
    if (!data.total_value || !data.status || !data.products || !data.user) {
      throw new Error('Faltan campos obligatorios para crear un pedido');
    }
    return new OrderRequestDTO(data);
  }
}
