import React, { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";
import "./createListing.scss";

const CreateListing = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSubmit = () => {
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
          console.log(progress);
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

  return (
    <Container>
      <p className="mt-5 fw-bold fs-2 text-center">Create Listing</p>
      <Row>
        <Col sm={12} md={6} lg={6} xl={4} className="offset-xl-2 ">
          {" "}
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                className="bg-light"
                type="text"
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                className="bg-light"
                placeholder="Description"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                className="bg-light"
                placeholder="Address"
              />
            </Form.Group>
          </Form>
          <div className="d-flex flex-wrap  gap-4 mt-3 mx-1">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <Form.Check /> <span>Sell</span>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <Form.Check /> <span>Rent</span>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <Form.Check /> <span>Parking Spot</span>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <Form.Check className="fw-bold" /> <span>Furnished</span>
            </div>
            <div className="d-flex align-items-center justify-content-start  gap-2">
              <Form.Check className="" /> <span>Offer</span>
            </div>
          </div>
          <div className="d-flex align-items-center mt-3 ">
            <div className="d-flex align-items-center  gap-2">
              <input type="number" className=" w-50 p-3 border rounded-3" />
              <span>Beds</span>
            </div>
            <div className="d-flex align-items-center  gap-2">
              <input type="number" className=" w-50 p-3 border rounded-3" />
              <span>Baths</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex align-items-center  gap-2">
              <input type="number" className=" w-25 p-3 border rounded-3" />
              <div className="d-flex flex-column align-items-center">
                <span>Regular Price</span>
                <span className="small">($ / month)</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 mt-3">
              <input type="number" className=" w-25 p-3 border rounded-3" />
              <div className="d-flex flex-column align-items-center">
                <span>Discounted Price</span>
                <span className="small">($ / month)</span>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={12} md={6} lg={6} xl={4} className="mt-4 mt-sm-0">
          <p>
            <span className="fw-bold">Images:</span> The first image will be the
            cover (max 6)
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
                  width="150px"
                  height="150px"
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

          <Button className="w-100 mt-3 p-3" variant="dark">
            CREATE LISTING
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateListing;
