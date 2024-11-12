import User from "../models/user.models.js";
import { createUserToken } from "../utils/userToken.js";

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
    rest,
  });
}

export { signUp, signin };
