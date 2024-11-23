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

async function getSearchedListings(req, res) {
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;

  let offer = req.query.offer;

  if (offer === undefined || offer === "false") {
    offer = { $in: [true, false] };
  }

  let furnished = req.query.furnished;

  if (furnished === undefined || furnished === "false") {
    furnished = { $in: [true, false] };
  }

  let parking = req.query.parking;

  if (parking === undefined || parking === "false") {
    parking = { $in: [true, false] };
  }

  let type = req.query.type;
  if (type === undefined || type === "all") {
    type = { $in: ["sell", "rent"] };
  }

  const searchTerm = req.query.searchTerm || "";

  const sort = req.query.sort || "createdAt";

  const order = req.query.order || "desc";

  const listings = await Listing.find({
    name: { $regex: searchTerm, $options: "i" },
    offer,
    parking,
    furnished,
    type,
  })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);

  return res.status(200).json({ error: false, listings });
}

export {
  createListing,
  deleteUserListing,
  updateUserListing,
  getSingleListing,
  getSearchedListings,
};
