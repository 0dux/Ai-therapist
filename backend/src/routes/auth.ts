import { Router } from "express";
import {
  loginUser as login,
  logoutUser as logout,
  registerUser as register,
} from "../controllers/authControler";
import { auth } from "../middlewares/auth";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/me", auth, (req, res) => {
  res.json(req.user);
});

export default router;
