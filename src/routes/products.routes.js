import { Router } from "express";
import { getProducts, getProductsByAnimal, getProductById,} from "../controllers/product.controller.js";

const router = Router();

// [ ] GET → Listar todos
router.get("/", getProducts);

// [ ] GET → Filtrar por animal
router.get("/animal/:animal", getProductsByAnimal);

// [ ] GET → Listar por id
router.get("/:id", getProductById);

export default router;
