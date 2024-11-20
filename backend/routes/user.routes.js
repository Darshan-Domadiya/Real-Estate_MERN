import { Router } from "express";
import {
  deleteUser,
  getUserListings,
  updateUser,
} from "../controllers/user.controllers.js";
import { verifyUserByToken } from "../middlewares/user.middlewares.js";

const router = Router();

router.post("/update/:id", verifyUserByToken, updateUser);
router.delete("/delete/:id", verifyUserByToken, deleteUser);
router.get("/listing/:id", verifyUserByToken, getUserListings);

export default router;
