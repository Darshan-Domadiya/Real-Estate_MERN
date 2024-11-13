import { Router } from "express";
import {
  logInWithGoogle,
  signin,
  signUp,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signin);
router.post("/google", logInWithGoogle);

export default router;
