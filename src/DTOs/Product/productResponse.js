export class ProductResponse {
  constructor({ id, name, price_lb, description, stock, animal }) {
    this.id = id;
    this.name = name;
    this.price_lb = price_lb;
    this.description = description;
    this.stock = stock;
    this.animal = animal;
  }
}
