import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).send({ message: "Unauthorize No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KE);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorize Invalid Token" });
  }
}
