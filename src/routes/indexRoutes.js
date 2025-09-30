import { Router } from "express";
import productsRouter from "./products.routes.js";
import pruebaRouter from "./prueba.routes.js";
import userRouter from "./user.routes.js";


const router = Router();
router.use('/user', userRouter);
router.use('/products', productsRouter);
router.use('/prueba', pruebaRouter);

export default router;