import foodPartnerModel from "../models/foodpartner.model.js";
import jwt from "jsonwebtoken";

export async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return req.status(401).json({
      message: "Unauthorised access",
    });
  }

  try {
    // if token is verified then decoded has the id, else has error
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}
