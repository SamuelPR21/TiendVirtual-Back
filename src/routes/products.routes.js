import { Router } from "express";
import { authenticaToken } from "../middleware/auth.js";
import { getProducts, getProductsByAnimal, getProductById,} from "../controllers/product.controller.js";

const router = Router();

// [ ] GET → Listar todos
router.get("/", authenticaToken, getProducts);

// [ ] GET → Filtrar por animal
router.get("/animal/:animal", authenticaToken, getProductsByAnimal);

// [ ] GET → Listar por id
router.get("/:id", authenticaToken, getProductById);

export default router;
