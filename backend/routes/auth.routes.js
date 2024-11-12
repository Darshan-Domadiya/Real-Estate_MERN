import { Router } from "express";
import { signin, signUp } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signin);

export default router;
