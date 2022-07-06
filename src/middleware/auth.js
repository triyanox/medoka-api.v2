import jwt from "jsonwebtoken";
import { env } from "process";

// auth middleware
/**
 * @usage
 * Used on routes that require authentication
 **/
export default function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(400).send("Invalid token.");
      req.manager = decoded;
      next();
    });
  } catch (e) {
    next(e);
  }
}
