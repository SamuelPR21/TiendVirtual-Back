import { Router } from "express";
import productsRouter from "./products.routes.js";
import userRouter from "./user.routes.js";
import offertsRouter from "./offerts.routes.js";
import aboutUsRouter from "./aboutUs.routes.js";
import recipesRouter from "./recipes.routes.js";


const router = Router();
router.use('/user', userRouter);
router.use('/products', productsRouter);
router.use('/offerts', offertsRouter);
router.use('/aboutUs', aboutUsRouter);
router.use('/recipes', recipesRouter);

export default router;