import * as recipeService from "../service/recipe.service.js";
import { RecipeListRequest, RecipeByIngredientsRequest } from "../DTOs/recipe/recipeRequest.js";

// [ ] GET → Listar todos
export const getRecipes = async (_req, res) => {
  try {
    const _dto = new RecipeListRequest();
    const result = await recipeService.getRecipes();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error listando recetas", error: err.message });
  }
};

// [ ] GET → Listar por id
export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipeService.getRecipeById(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo receta", error: err.message });
  }
};

// [ ] GET → Filtrar por ingredientes
// Ejemplo: GET /recipes/ingredients?productIds=671c...a1,671c...b2
export const getRecipesByIngredients = async (req, res) => {
  try {
    const dto = new RecipeByIngredientsRequest(req.query);
    const result = await recipeService.getRecipesByIngredients(dto.productIds);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error filtrando por ingredientes", error: err.message });
  }
};

// [ ] GET → Filtrar por producto
// Ejemplo: GET /recipes/product/671c...a1
export const getRecipesByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await recipeService.getRecipesByProduct(productId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error filtrando por producto", error: err.message });
  }
};

// [ ] POST → Crear receta (solo admin)
export const createRecipe = async (req, res) => {
  try {
    const result = await recipeService.createRecipe(req.body); // {name,instructions,ingredients:[{producto_id,quantity}]}
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message || "Error creando receta" });
  }
};