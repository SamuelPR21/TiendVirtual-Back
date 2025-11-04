export class ProductResponse {
  constructor({ id, name, price_lb, description, stock, animal, image_url }) {
    this.id = id;
    this.name = name;
    this.price_lb = price_lb;
    this.description = description;
    this.stock = stock;
    this.animal = animal;
    this.image_url = image_url || null;
  }
}
