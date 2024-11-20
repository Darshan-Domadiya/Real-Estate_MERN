import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";
// import "./createListing.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateListing = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "sell",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleImageSubmit = () => {
    if (imageFiles.length === 0)
      return setImageUploadError(
        "Please upload at least one image per listing"
      );

    if (
      imageFiles.length > 0 &&
      imageFiles.length + formData.imageUrls.length < 7
    ) {
      setIsUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < imageFiles.length; i++) {
        promises.push(storeImageFiles(imageFiles[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setIsUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image uploading failed!(2 MB max per image)");
          setIsUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 image per listing!");
      setIsUploading(false);
    }
  };

  const storeImageFiles = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;

      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   console.log(progress);
        },
        (error) => {
          reject(error);
          console.log("ERROR in uploading image!", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            resolve(downloadUrl)
          );
        }
      );
    });
  };

  const handleImageRemove = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleInputsChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.id === "description"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length < 1)
      return setIsError("You must upload at least 1 image..!");

    if (formData.discountedPrice > formData.regularPrice)
      return setIsError("Discount price must be lower than regular price");

    try {
      setLoading(true);
      const response = await axios.post(
        `/api/listing/update-listing/${listingId}`,
        {
          name: formData.name,
          description: formData.description,
          address: formData.address,
          bathrooms: formData.bathrooms,
          bedrooms: formData.bedrooms,
          type: formData.type,
          regularPrice: formData.regularPrice,
          discountedPrice: formData.discountedPrice,
          offer: formData.offer,
          parking: formData.parking,
          furnished: formData.furnished,
          imageUrls: formData.imageUrls,
          userRef: currentUser._id,
        }
      );

      if (response.status === 200) {
        console.log(" listing is updated!", response.data);
        navigate(`/listing/${response.data.updatedListing._id}`);
        setLoading(false);
        setIsError(false);
      }
    } catch (error) {
      console.log("Error while updating new listing!", error);
      setIsError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getSingleListing = async () => {
      try {
        const response = await axios.get(
          `/api/listing/single-listing/${listingId}`
        );
        if (response.status === 200) {
          console.log("Single listing ", response.data);
          setFormData(response.data.singleListing);
        }
      } catch (error) {
        console.log("ERROR while getting the single listing", error);
      }
    };

    getSingleListing();
  }, []);

  return (
    <Container>
      <p className="mt-5 fw-bold fs-2 text-center">Update Listing</p>
      <Row>
        <Col>
          <Form
            onSubmit={handleFormSubmit}
            className="d-flex flex-column flex-md-row gap-3 gap-lg-4 offset-xl-2 "
          >
            <div className="col-12 col-md-6 col-xl-5">
              <Form.Group className="mb-3">
                <Form.Control
                  className="bg-light"
                  type="text"
                  placeholder="Name"
                  id="name"
                  required
                  onChange={handleInputsChange}
                  value={formData.name}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  id="description"
                  className="bg-light form-control"
                  placeholder="Description"
                  rows={3}
                  required
                  onChange={handleInputsChange}
                  value={formData.description}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  className="bg-light"
                  placeholder="Address"
                  id="address"
                  required
                  onChange={handleInputsChange}
                  value={formData.address}
                />
              </Form.Group>

              <div className="d-flex flex-wrap  gap-4 mt-3 mx-1">
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Form.Check
                    id="sell"
                    onChange={handleInputsChange}
                    checked={formData.type === "sell"}
                  />
                  <span>Sell</span>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Form.Check
                    id="rent"
                    onChange={handleInputsChange}
                    checked={formData.type === "rent"}
                  />{" "}
                  <span>Rent</span>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Form.Check
                    id="parking"
                    onChange={handleInputsChange}
                    value={formData.parking}
                  />{" "}
                  <span>Parking Spot</span>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Form.Check
                    id="furnished"
                    onChange={handleInputsChange}
                    value={formData.furnished}
                  />{" "}
                  <span>Furnished</span>
                </div>
                <div className="d-flex align-items-center justify-content-start  gap-2">
                  <Form.Check
                    id="offer"
                    onChange={handleInputsChange}
                    value={formData.offer}
                  />{" "}
                  <span>Offer</span>
                </div>
              </div>
              <div className="d-flex align-items-center mt-3 ">
                <div className="d-flex align-items-center  gap-2">
                  <input
                    id="bedrooms"
                    type="number"
                    className=" w-50 p-3 border rounded-3"
                    required
                    onChange={handleInputsChange}
                    value={formData.bedrooms}
                  />
                  <span>Beds</span>
                </div>
                <div className="d-flex align-items-center  gap-2">
                  <input
                    id="bathrooms"
                    type="number"
                    className=" w-50 p-3 border rounded-3"
                    required
                    onChange={handleInputsChange}
                    value={formData.bathrooms}
                  />
                  <span>Baths</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="d-flex align-items-center  gap-2">
                  <input
                    id="regularPrice"
                    type="number"
                    className=" w-25 p-3 border rounded-3"
                    required
                    onChange={handleInputsChange}
                    value={formData.regularPrice}
                    min="50"
                    max="1000000"
                  />
                  <div className="d-flex flex-column align-items-center">
                    <span>Regular Price</span>
                    {formData.type === "rent" && (
                      <span className="small">($ / month)</span>
                    )}
                  </div>
                </div>
                {formData.offer === true && (
                  <div className="d-flex align-items-center gap-2 mt-3">
                    <input
                      type="number"
                      className=" w-25 p-3 border rounded-3"
                      required
                      min="0"
                      max="100000"
                      id="discountedPrice"
                      onChange={handleInputsChange}
                      value={formData.discountedPrice}
                    />
                    <div className="d-flex flex-column align-items-center">
                      <span>Discounted Price</span>
                      {formData.type === "rent" && (
                        <span className="small">($ / month)</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-5">
              <p>
                <span className="fw-bold">Images:</span> The first image will be
                the cover (max 6)
              </p>
              <div className="d-flex align-items-center gap-2 gap-md-3">
                <div className="border w-75 rounded-3">
                  <input
                    type="file"
                    className="p-2 p-md-3"
                    accept="image/*"
                    onChange={(e) => setImageFiles(e.target.files)}
                    multiple
                  />
                </div>
                <Button
                  onClick={handleImageSubmit}
                  type="button"
                  variant="outline-success"
                  className="p-2 p-md-3"
                >
                  {isUploading ? " Uploading" : "Upload"}
                </Button>
              </div>
              {imageUploadError && (
                <p className="text-danger small mt-2">{imageUploadError}</p>
              )}
              <div className="mt-3">
                {formData.imageUrls.map((imageUrls, index) => (
                  <div
                    key={index}
                    className="border rounded-3 p-2 d-flex align-items-center justify-content-between mt-3"
                  >
                    <Image
                      src={imageUrls}
                      className="img-fluid object-fit-cover"
                      width="120px"
                      height="100px"
                    />
                    <span
                      className="fw-medium text-danger delete-cursor"
                      onClick={() => {
                        handleImageRemove(index);
                      }}
                    >
                      DELETE
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className="w-100 mt-sm-0 mt-md-3 p-3"
                variant="dark"
                type="submit"
              >
                {loading ? "Updating..." : "  UPDATE LISTING"}
              </Button>
              {isError && <p className="text-danger small mt-2">{isError}</p>}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateListing;
