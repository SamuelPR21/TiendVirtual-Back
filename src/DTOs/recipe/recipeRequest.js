// Para GET /recipes (sin filtros)
export class RecipeListRequest {
  constructor() {}
}

// Para GET /recipes/ingredients?productIds=ID1,ID2,ID3
export class RecipeByIngredientsRequest {
  constructor({ productIds }) {
    // puede venir como string "a,b,c" o array
    this.productIds = Array.isArray(productIds)
      ? productIds
      : (productIds || '')
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);
  }
}