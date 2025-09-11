import express from "express";
import {
  authFoodPartnerMiddleware,
  authUserMiddleware,
} from "../middlewares/auth.middleware.js";
import {
  createFood,
  getFoodItems,
  getSaveFood,
  likeFood,
  saveFood,
} from "../controllers/food.controller.js";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

/* POST  /api/food  [PROTECTED]
Only food partner can add the food item */
router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);

/* GET /api/food/ [PROTECTED] */
router.get("/", authUserMiddleware, getFoodItems);

router.post("/like", authUserMiddleware, likeFood);

router.post("/save", authUserMiddleware, saveFood);

router.get("/save", authUserMiddleware, getSaveFood);

export default router;
