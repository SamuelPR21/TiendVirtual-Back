import { Router } from "express";
import { checkoutPayment, getPaymentForOrder } from "../controllers/payment.controller.js";
import { authenticaToken } from "../middleware/auth.js";

const router = Router();

// POST /carniceria/payments/checkout
router.post("/checkout", authenticaToken, checkoutPayment);

// GET /carniceria/payments/order/:orderId
router.get("/order/:orderId", authenticaToken, getPaymentForOrder);

export default router;
