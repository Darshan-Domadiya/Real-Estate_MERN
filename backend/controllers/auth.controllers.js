import User from "../models/user.models.js";
import { createUserToken } from "../utils/userToken.js";
import bcrypt from "bcrypt";

async function signUp(req, res) {
  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    return res
      .status(400)
      .json({ error: true, message: "All field are required!" });
  }

  const isUserExists = await User.findOne({ $or: [{ username }, { email }] });

  if (isUserExists) {
    return res
      .status(400)
      .json({ error: true, message: "User already Exists!" });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  return res.status(201).json({ error: false, message: "User is created!" });
}

async function signin(req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required!" });
  }

  const userExists = await User.findOne({ email });

  if (!userExists) {
    return res
      .status(404)
      .json({ error: true, message: "User does not exists!" });
  }

  const isPasswordCorrect = await userExists.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return res
      .status(404)
      .json({ error: true, message: "User credentials are not valid!" });
  }

  const token = createUserToken(userExists);

  const { password: userPassword, ...rest } = userExists._doc;

  res.cookie("token", token).status(200).json({
    error: false,
    message: "User signin successfully!",
    user: rest,
  });
}

async function logInWithGoogle(req, res) {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const token = createUserToken(user);
    const { password: password, ...rest } = user._doc;
    res.cookie("token", token).status(200).json({
      error: false,
      message: "User loggedIn with google successfully!",
      user: user,
    });
  } else {
    const generatedRandomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedRandomPassword, 10);

    const newUser = await User.create({
      username:
        req.body.username.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 10000).toString(),
      email: req.body.email,
      profileImage: req.body.profilImage,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({
        error: true,
        message: "Something went wrong while log in with google!",
      });
    }

    const userToken = createUserToken(newUser);

    const { password: password, ...rest } = newUser._doc;

    res.cookie("token", userToken).status(200).json({
      error: false,
      message: "User logged in with google successfully!",
      user: rest,
    });
  }
}

async function signOutUser(req, res) {
  res.clearCookie("token");

  res
    .status(200)
    .json({ error: false, message: "User sign out successfully!" });
}

export { signUp, signin, logInWithGoogle, signOutUser };
