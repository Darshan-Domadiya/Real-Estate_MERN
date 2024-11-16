import { Router } from "express";
import { createListing } from "../controllers/listing.controllers.js";
import { verifyUserByToken } from "../middlewares/user.middlewares.js";

const router = Router();

router.post("/create-listing", verifyUserByToken, createListing);

export default router;
