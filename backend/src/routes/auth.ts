import { Router } from "express";
import {
  loginUser as login,
  registerUser as register,
} from "../controllers/authControler";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
