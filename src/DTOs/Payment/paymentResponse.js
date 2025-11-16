export class PaymentResponseDTO {
  constructor(payment) {
    this.id = payment._id;
    this.order_id = payment.order_id;
    this.amount = payment.amount;
    this.status = payment.status;
    this.card_last4 = payment.card_last4;
    this.card_brand = payment.card_brand;
    this.created_at = payment.created_at;
  }

  static fromModel(payment) {
    return new PaymentResponseDTO(payment);
  }
}
