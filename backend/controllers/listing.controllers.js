import Listing from "../models/listing.models.js";

async function createListing(req, res) {
  const listing = await Listing.create(req.body);

  return res.status(201).json({ error: false, listing: listing });
}

export { createListing };
