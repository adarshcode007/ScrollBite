import express from "express";
import { authFoodPartnerMiddleware } from "../middlewares/auth.middleware.js";
import { createFood } from "../controllers/food.controller.js";

const router = express.Router();

//  POST  /api/food  [PROTECTED]
// Only food partner can add the food item
router.post("/", authFoodPartnerMiddleware, createFood);

export default router;
