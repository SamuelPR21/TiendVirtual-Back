import { Router } from "express";
import { getProducts, getProductsByAnimal, getProductById,} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);

router.get("/animal/:animal", getProductsByAnimal);

router.get("/:id", getProductById);

export default router;
