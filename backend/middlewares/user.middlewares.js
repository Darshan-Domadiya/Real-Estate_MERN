import jwt from "jsonwebtoken";

async function verifyUserByToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "Unauthorized request!" });
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: true, message: "Forbidden" });
    }

    req.user = user;
    next();
  });
}

export { verifyUserByToken };
