import foodPartnerModel from "../models/foodpartner.model.js";

export async function getFoodPartnerById(req, res) {
  const foodPartnerId = req.params.id;

  const foodPartner = await foodPartnerModel.findById(foodPartnerId);

  if (!foodPartner) {
    return res.status(404).json({ message: "Food partner not found" });
  }

  res.status(200).json({
    message: "Food partner retrieved successfully",
    foodPartner,
  });
}
