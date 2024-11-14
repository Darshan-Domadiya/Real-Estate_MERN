import User from "../models/user.models.js";
import bcrypt from "bcrypt";

async function updateUser(req, res) {
  if (req.user._id !== req.params.id) {
    return res
      .status(401)
      .json({ error: true, message: "You do not have access!" });
  }

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profileImage: req.body.profileImage,
      },
    },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(400).json({
      error: true,
      message: "User is not updated, something went wrong!",
    });
  }

  const { password: pass, ...rest } = updatedUser._doc;

  res
    .status(200)
    .json({ error: false, message: "User updated successfully!", user: rest });
}

async function deleteUser(req, res) {
  if (req.user._id !== req.params.id) {
    return res
      .status(401)
      .json({ error: true, message: "You do not have access!" });
  }

  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    return res.status(400).json({
      error: true,
      message: "User is not deleted, something went wrong!",
    });
  }

  const { password: password, ...rest } = deletedUser._doc;

  res
    .status(200)
    .json({ error: false, message: "User deleted successfully!", user: rest });
}



export { updateUser, deleteUser };
