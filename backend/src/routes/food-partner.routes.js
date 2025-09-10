import express from "express";
import { getFoodPartnerById } from "../controllers/food-partner.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/food-partner/:id", authUserMiddleware, getFoodPartnerById);

export default router;
