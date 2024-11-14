import { Router } from "express";
import {
  logInWithGoogle,
  signin,
  signOutUser,
  signUp,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signin);
router.post("/google", logInWithGoogle);
router.get("/signout", signOutUser);

export default router;
