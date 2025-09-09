import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const foodPartnerModel = mongoose.model("food", foodPartnerSchema);

export default foodPartnerModel;
