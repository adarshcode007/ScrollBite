import express from "express";
import { authFoodPartnerMiddleware } from "../middlewares/auth.middleware.js";
import { createFood } from "../controllers/food.controller.js";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

//  POST  /api/food  [PROTECTED]
// Only food partner can add the food item
router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);

export default router;
