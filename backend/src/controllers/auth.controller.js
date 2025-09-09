import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import foodPartnerModel from "../models/foodpartner.model.js";

export async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in Successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

export function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

export async function registerFoodPartner(req, res) {
  const { name, email, password } = req.body;
  const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });

  if (isAccountAlreadyExists)
    return res.status(400).json({ message: "Food Partner already Registered" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: foodPartner._id }, process.env.SECRET_KEY);

  res.cookie("token", token);

  res.status(201).json({
    message: "Food Partner Registered Successfully",
    foodPartner: {
      id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
    },
  });
}

export async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({ email });

  if (!foodPartner) {
    res.status(400).json({ message: "Invalid Email or Password" });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    res.status(400).json({ mesage: "Invalid Email or Password" });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.SECRET_KEY
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Food Partner logged in successfully",
    foodPartner: {
      id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
    },
  });
}

export function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Food Partner logged out successfully" });
}
