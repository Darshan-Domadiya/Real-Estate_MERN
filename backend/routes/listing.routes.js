import { Router } from "express";
import {
  createListing,
  deleteUserListing,
  updateUserListing,
  getSingleListing,
  getSearchedListings,
} from "../controllers/listing.controllers.js";
import { verifyUserByToken } from "../middlewares/user.middlewares.js";

const router = Router();

router.post("/create-listing", verifyUserByToken, createListing);
router.delete("/delete-listing/:id", verifyUserByToken, deleteUserListing);
router.post("/update-listing/:id", verifyUserByToken, updateUserListing);
router.get("/single-listing/:id", getSingleListing);
router.get("/getListings", getSearchedListings);

export default router;
