import userModel from "../models/usermodel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import asyncHandler from "async-handler";
import usermodel from "../models/usermodel.js";

export const registerController = async (req, res) => {
  try {
    const { fname, lname, email, password, phone, answer } = req.body;
    console.log(req.body);
    //validations
    if (!fname) {
      return res.send({ message: "First Name is Required" });
    }
    if (!lname) {
      return res.send({ message: "Last Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    //   if (!answer) {
    //     return res.send({ message: "Answer is Required" });
    //   }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registerd please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      fname,
      lname,
      email,
      phone,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Incorrect credentials",
      });
    }

    //   creating token
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIREIN }
    );
    res.status(200).send({
      success: true,
      message: "login Successful",
      user: {
        fname: user.fname,
        lname: user.lname,
        id: user._id,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const testController = async (req, res) => {
  res.send("protected routes");
};
