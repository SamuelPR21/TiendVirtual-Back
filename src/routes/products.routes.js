import { Router } from "express";
import { getProducts, getProductsByAnimal, getProductById, createProduct } from "../controllers/product.controller.js";
import { authenticaToken } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/authorize.js";

const router = Router();

router.get("/", getProducts);

router.get("/animal/:animal", getProductsByAnimal);

router.get("/:id", getProductById);

// POST solo admin
router.post("/", authenticaToken, authorizeRoles('admin'), createProduct);

export default router;
