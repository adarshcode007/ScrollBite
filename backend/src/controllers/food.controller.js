import foodModel from "../models/fooditem.model.js";

export async function createFood(req, res) {
  console.log(req.foodPartner);
  res.send("food item created");
}
