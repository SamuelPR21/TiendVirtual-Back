export class OffertsRequest {
    constructor({ name, description, discount, producto_id, producto_snapshot, start_date, end_date}) {
      this.name = name;
      this.description = discount;
      this.discount = discount;
      this.producto_id = producto_id;
      this.producto_snapshot = producto_snapshot;
      this.start_date = start_date;
      this.end_date = end_date;
    }
  }