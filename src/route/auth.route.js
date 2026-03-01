import express from "express";
import { login, logout, signupControler } from "../controler/auth.controler.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signupControler);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, (req, res) => {
  res.status(200).send({ user: req.user });
});
export default router;
