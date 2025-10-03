export class OffertsResponse {
    constructor({ id, name, description, discount, producto_id, producto_snapshot, start_date, end_date}) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.discount = discount;
      this.producto_id = producto_id;
      this.producto_snapshot = producto_snapshot;
      this.start_date = start_date;
      this.end_date = end_date;
    }
  }