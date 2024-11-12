import jwt from "jsonwebtoken";

function createUserToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
}

function validateToken() {}

export { createUserToken, validateToken };
