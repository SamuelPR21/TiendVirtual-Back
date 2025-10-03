import { Router } from "express";
import productsRouter from "./products.routes.js";
import pruebaRouter from "./prueba.routes.js";
import userRouter from "./user.routes.js";
import offertsRouter from "./offerts.routes.js";


const router = Router();
router.use('/user', userRouter);
router.use('/products', productsRouter);
router.use('/prueba', pruebaRouter);
router.use('/offerts', offertsRouter);

export default router;