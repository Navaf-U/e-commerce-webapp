import jwt from "jsonwebtoken";
import User from "../models/usersSchema.js";
import bcrypt from "bcrypt";
import CustomError from "../utils/customError.js";
import { joiUserSchema } from "../models/joiValSchema.js";

// createToken
const createToken = (id,role,expiresIn) => {
  return jwt.sign({ id ,role }, process.env.JWT_TOKEN,{expiresIn});
};

const userRegister = async (req, res,next) => {
  //validating with joi
  const { value, error } = joiUserSchema.validate(req.body);
  const { name, email, password } = value;
  if(error){
    return next(new CustomError(error.details[0].message,400))
  }
  // emailChecking
  const exists = await User.findOne({ email });
  if (exists) {
    return next(new CustomError("User already exists",400))
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

  if(user.isBlocked){
    return next(new CustomError("User is Blocked", 403));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Incorrect password", 401));
  }
  // creating token for logged user
  const token = createToken(user._id,user.role,"1h");
  res.json({ message:"You've successfully logged in", token });
};

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("User doesn't exist", 401));
  }
  if(user.role !== "admin"){
    return next(new CustomError("You are not an admin", 403));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Incorrect password", 401));
  }
  // creating token for logged admin
  const token = createToken(user._id,user.role,"1h");
  res.json({ message:"Admin successfully logged in", token });
};

export { userRegister, loginUser, adminLogin };
