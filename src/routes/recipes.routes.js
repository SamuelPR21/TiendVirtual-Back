import { Router } from "express";
import { authenticaToken } from "../middleware/auth.js";
import {
  getRecipes,
  getRecipeById,
  getRecipesByIngredients,
  getRecipesByProduct,
} from "../controllers/recipe.controller.js";

const router = Router();

router.get("/", authenticaToken, getRecipes);

router.get("/:id", authenticaToken, getRecipeById);

router.get("/filters/ingredients", authenticaToken, getRecipesByIngredients);

router.get("/filters/product/:productId", authenticaToken, getRecipesByProduct);

export default router;