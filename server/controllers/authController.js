import jwt from "jsonwebtoken";
import User from "../models/usersSchema.js";
import bcrypt from "bcrypt";
import CustomError from "../utils/customError.js";
import { joiUserSchema } from "../models/joiValSchema.js";

// createToken
const createToken = (id, role, expiresIn) => {
  return jwt.sign({ id, role }, process.env.JWT_TOKEN, { expiresIn });
};
const createRefreshToken = (id, role, expiresIn) => {
  return jwt.sign({ id, role }, process.env.JWT_REFRESH_TOKEN, { expiresIn });
};

const userRegister = async (req, res, next) => {
  //validating with joi
  const { value, error } = joiUserSchema.validate(req.body);
  const { name, email, password } = value;
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  // emailChecking
  const exists = await User.findOne({ email });
  if (exists) {
    return next(new CustomError("User already exists", 400));
  }
  // password Hashing + salt
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  // adding user to db
  await newUser.save();
  res.json({ success: true, message: "user registered" });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new CustomError("User doesn't exist", 401));
  }

  
  if (user.isBlocked) {
    return next(new CustomError("User is Blocked", 403));
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }
  if (user.role === "admin") {
    return next(new CustomError("Access denied.Nice try, though! :)", 403));
  }
  // creating token for logged user
  const token = createToken(user._id, user.role, "1h");
  const refreshToken = createRefreshToken(user._id, user.role, "1d");

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, 
    sameSite: "None",
  });

  const currentUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  //sending user details to client (for curr user)
  res.cookie("currentUser", JSON.stringify(currentUser));

  //sending token to cookie
  res.cookie("token", token, {
    httpOnly: false,
    secure: true,
    sameSite: "None",
  });
  console.log(user)

  res.json({ message: "user successfully logged in", token });
};

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("User doesn't exist", 401));
  }
  if (user.role !== "admin") {
    return next(new CustomError("You are not an admin", 403));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }

  // creating token for logged admin
  const token = createToken(user._id, user.role, "1h");
  const refreshToken = createRefreshToken(user._id, user.role, "1d");
  user.refreshToken = refreshToken;
  await user.save();

  //sending refreshToken to cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none", //can change to strict
  });

  const currentUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  //sending user details to client (for curr user)
  res.cookie("currentUser", JSON.stringify(currentUser));

  //sending token to cookie
  res.cookie("token", token, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  res.json({ message: "Admin successfully logged in", token });
};

// controller to handle refresh
const refreshingToken = async (req, res, next) => {
  if (!req.cookies) {
    return next(new CustomError("No cookies found", 401));
  }
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(new CustomError("No refresh token found", 401));
  }

  // Verifying the refresh token
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== refreshToken) {
    return next(new CustomError("Invalid refresh token", 401));
  }
  let accessToken = createToken(user._id, user.role, "1h");
  
  res.status(200).json({ message: "Token refreshed", token: accessToken });
};

// controller to handle logout
const logout = async (req, res, next) => {
  // Clearing the refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("token", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("currentUser", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};

export { userRegister, loginUser, adminLogin, refreshingToken, logout };
