import { Router } from "express";
import { deleteUser, updateUser } from "../controllers/user.controllers.js";
import { verifyUserByToken } from "../middlewares/user.middlewares.js";

const router = Router();

router.post("/update/:id", verifyUserByToken, updateUser);
router.delete("/delete/:id", verifyUserByToken, deleteUser);

export default router;
