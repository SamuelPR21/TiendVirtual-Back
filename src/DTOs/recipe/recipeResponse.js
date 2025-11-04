export class RecipeResponse {
  constructor({ id, name, instructions, ingredients }) {
    this.id = id;
    this.name = name;
    this.instructions = instructions;
    // mapeo simple para exponer igual que el modelo
    this.ingredients = ingredients?.map(i => ({
      producto_id: i.producto_id,
      quantity: i.quantity,
    })) || [];
  }
}