import { Router } from "express";
import { authenticaToken } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/authorize.js";
import {
  getRecipes,
  getRecipeById,
  getRecipesByIngredients,
  getRecipesByProduct,
  createRecipe,
} from "../controllers/recipe.controller.js";

const router = Router();

router.get("/", authenticaToken, getRecipes);

router.get("/:id", authenticaToken, getRecipeById);

router.get("/filters/ingredients", authenticaToken, getRecipesByIngredients);

router.get("/filters/product/:productId", authenticaToken, getRecipesByProduct);

// POST: solo admin
router.post("/", authenticaToken, authorizeRoles("admin"), createRecipe);

export default router;