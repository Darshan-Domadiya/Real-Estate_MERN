import { Router } from "express";
import {
  createListing,
  deleteUserListing,
} from "../controllers/listing.controllers.js";
import { verifyUserByToken } from "../middlewares/user.middlewares.js";

const router = Router();

router.post("/create-listing", verifyUserByToken, createListing);
router.delete("/delete-listing/:id", verifyUserByToken, deleteUserListing);

export default router;
