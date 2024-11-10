import User from "../models/user.models.js";

async function signUp(req, res) {
  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    return res
      .status(400)
      .json({ error: true, message: "All field are required!" });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  return res.status(201).json({ error: false, message: "User is created!" });
}

export { signUp };
