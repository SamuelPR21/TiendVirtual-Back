import { Router } from "express";
import { authenticaToken } from "../middleware/auth.js";
import {
  getRecipes,
  getRecipeById,
  getRecipesByIngredients,
  getRecipesByProduct,
} from "../controllers/recipe.controller.js";

const router = Router();

// [ ] GET → Listar todos
router.get("/", authenticaToken, getRecipes);

// [ ] GET → Listar por id
router.get("/:id", authenticaToken, getRecipeById);

// [ ] GET → Filtrar por ingredientes (query productIds=ID1,ID2,...)
router.get("/filters/ingredients", authenticaToken, getRecipesByIngredients);

// [ ] GET → Filtrar por producto (param :productId)
router.get("/filters/product/:productId", authenticaToken, getRecipesByProduct);

export default router;