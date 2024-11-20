import Listing from "../models/listing.models.js";

async function createListing(req, res) {
  const listing = await Listing.create(req.body);

  return res.status(201).json({ error: false, listing: listing });
}

async function deleteUserListing(req, res) {
  const isListing = await Listing.findById(req.params.id);

  if (!isListing) {
    return res.status(404).json({ error: true, message: "No listing exists!" });
  }

  if (req.user._id !== isListing.userRef) {
    return res
      .status(403)
      .json({ error: true, message: "You can only delete your listings!" });
  }

  const deletedListing = await Listing.findByIdAndDelete(req.params.id);

  if (!deletedListing) {
    return res.status(400).json({
      error: true,
      message: "Something went wrong while deleting your listing",
    });
  }
  res.status(200).json({ error: false, deletedListing });
}

async function updateUserListing(req, res) {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ error: true, message: "No listing exists!" });
  }

  if (req.user._id !== listing.userRef) {
    return res
      .status(403)
      .json({ error: true, message: "You can only update your listings!" });
  }

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedListing) {
    return res.status(400).json({
      error: true,
      message: "Something went wrong while updating the listing",
    });
  }

  res.status(200).json({ error: false, updatedListing });
}

async function getSingleListing(req, res) {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ error: true, message: "No listing exists!" });
  }

  const singleListing = await Listing.findById(req.params.id);

  if (!singleListing) {
    return res.status(400).json({
      error: true,
      message: "Something went wrong while getting single listing",
    });
  }

  res.status(200).json({ error: false, singleListing });
}

export {
  createListing,
  deleteUserListing,
  updateUserListing,
  getSingleListing,
};
