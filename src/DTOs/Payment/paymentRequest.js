export class PaymentRequestDTO {
  constructor({ order_id, amount, card_holder, card_number, exp_month, exp_year, cvv }) {
    this.order_id = order_id;
    this.amount = amount;
    this.card_holder = card_holder;
    this.card_number = card_number;
    this.exp_month = exp_month;
    this.exp_year = exp_year;
    this.cvv = cvv;
  }

  static validate(data) {
    const {
      order_id,
      amount,
      card_holder,
      card_number,
      exp_month,
      exp_year,
      cvv,
    } = data;

    if (!order_id || !amount || !card_holder || !card_number || !exp_month || !exp_year || !cvv) {
      throw new Error("Todos los campos de pago son obligatorios");
    }

    const digitsOnly = card_number.replace(/\s+/g, "");
    if (!/^\d{13,19}$/.test(digitsOnly)) {
      throw new Error("Número de tarjeta inválido");
    }

    if (!/^\d{2}$/.test(String(exp_month)) || exp_month < 1 || exp_month > 12) {
      throw new Error("Mes de expiración inválido");
    }

    if (!/^\d{2,4}$/.test(String(exp_year))) {
      throw new Error("Año de expiración inválido");
    }

    if (!/^\d{3,4}$/.test(String(cvv))) {
      throw new Error("CVV inválido");
    }

    return new PaymentRequestDTO({
      order_id,
      amount,
      card_holder,
      card_number: digitsOnly,
      exp_month,
      exp_year,
      cvv,
    });
  }
}
