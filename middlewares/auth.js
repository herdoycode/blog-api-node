import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("No token provide");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(400).send("Invalid token.");
  }
};
