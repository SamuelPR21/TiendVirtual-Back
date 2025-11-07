import mongoose from "mongoose";
import Recipes from "../models/recipes.js";
import { RecipeResponse } from "../DTOs/recipe/recipeResponse.js";

const toResponse = (doc) =>
  new RecipeResponse({
    id: doc._id,
    name: doc.name,
    instructions: doc.instructions,
    ingredients: doc.ingredients,
    image_url: doc.image_url,
  });

// [ ] GET → Listar todos
export const getRecipes = async () => {
  const recipes = await Recipes.find().lean();
  return recipes.map(r => toResponse(r));
};

// [ ] GET → Listar por id
export const getRecipeById = async (id) => {
  const recipe = await Recipes.findById(id).lean();
  if (!recipe) throw new Error("Receta no encontrada");
  return toResponse(recipe);
};

// [ ] GET → Filtrar por ingredientes (todas las recetas que contengan TODOS esos producto_id)
export const getRecipesByIngredients = async (productIds) => {
  const ids = productIds.map(id => new mongoose.Types.ObjectId(id));
  // Requiere que existan TODOS los producto_id indicados dentro del array de subdocumentos
  const query = {
    ingredients: {
      $all: ids.map(pid => ({ $elemMatch: { producto_id: pid } })),
    },
  };
  const recipes = await Recipes.find(query).lean();
  return recipes.map(r => toResponse(r));
};

// [ ] GET → Filtrar por producto (toda receta que contenga ese producto_id en sus ingredientes)
export const getRecipesByProduct = async (productId) => {
  const pid = new mongoose.Types.ObjectId(productId);
  const recipes = await Recipes.find({ "ingredients.producto_id": pid }).lean();
  return recipes.map(r => toResponse(r));
};

// [ ] POST → Crear receta (solo admin)
export const createRecipe = async (dto) => {
  const required = ["name", "instructions", "ingredients"];
  for (const f of required) {
    if (dto[f] === undefined || dto[f] === null) {
      throw new Error(`Campo requerido: ${f}`);
    }
  }
  if (!Array.isArray(dto.ingredients) || dto.ingredients.length === 0) {
    throw new Error("ingredients debe ser un arreglo no vacío");
  }

  const ingredients = dto.ingredients.map(i => {
    if (!i.producto_id || i.quantity === undefined) {
      throw new Error("Cada ingrediente debe tener producto_id y quantity");
    }
    return {
      producto_id: new mongoose.Types.ObjectId(i.producto_id),
      quantity: Number(i.quantity),
    };
  });

    const created = await Recipes.create({
    name: dto.name,
    instructions: dto.instructions,
    ingredients,
    image_url: dto.image_url || null,
  });

  return toResponse(created);
};