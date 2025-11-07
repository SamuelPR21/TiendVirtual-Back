export class RecipeResponse {
  constructor({ id, name, instructions, ingredients, image_url }) {
    this.id = id;
    this.name = name;
    this.instructions = instructions;
    // mapeo simple para exponer igual que el modelo
    this.ingredients = ingredients?.map(i => ({
      producto_id: i.producto_id,
      quantity: i.quantity,
    })) || [];
    this.image_url = image_url || null; 
  }
}