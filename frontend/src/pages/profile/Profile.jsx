import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import "./profile.scss";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const imageRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [profileImageData, setProfileImageData] = useState({});
  const [imageError, setImageError] = useState(false);
  const [updatedFormData, setUpdatedFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
  });

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async (image) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;

      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercentage(Math.round(progress));
        },
        (error) => {
          setImageError(true);
          console.log("ERROR in uploading image!", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            setProfileImageData({
              ...profileImageData,
              profileImage: downloadUrl,
            })
          );
        }
      );
    } catch (error) {
      console.log("ERROR while uploading image to the firebase!", error);
    }
  };

  console.log(imagePercentage);
  console.log(profileImageData);

  const handleInputChange = (e) => {
    setUpdatedFormData({ ...updatedFormData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="mt-5 ">
      <p className="fs-2 fw-bold text-center">PROFILE</p>

      <Row className="d-flex align-items-center justify-content-center">
        <Col xl={5}>
          <input
            type="file"
            ref={imageRef}
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Form className="text-center">
            <div className="d-flex flex-column text-center mb-2">
              <div className="">
                <Image
                  src={
                    profileImageData.profileImage || currentUser.profileImage
                  }
                  className="img-fluid object-fit-cover rounded-4 mb-3 border"
                  width="130px"
                  height="170px"
                  onClick={() => imageRef.current.click()}
                />
              </div>
              {imageError ? (
                <span className="text-danger fw-medium">
                  Error uploading image (file size must be less than 2 MB)
                </span>
              ) : imagePercentage > 0 && imagePercentage < 100 ? (
                <span>{`Uploading : ${imagePercentage} %`}</span>
              ) : imagePercentage === 100 ? (
                <span className="text-success fw-medium">
                  Image uploaded successfully!
                </span>
              ) : (
                ""
              )}
            </div>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                className="bg-secondary-subtle p-3"
                placeholder="username"
                onChange={handleInputChange}
                value={updatedFormData.username}
                name="username"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                className="bg-secondary-subtle p-3"
                placeholder="email"
                onChange={handleInputChange}
                name="email"
                value={updatedFormData.email}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                className="bg-secondary-subtle p-3"
                placeholder="password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="d-flex flex-column gap-2 ">
              <Button className="btn-dark p-3 fw-medium">Update</Button>
              <Button className="btn-success mt-1 p-3 fw-medium">
                Create Listing
              </Button>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-1 text-danger">
              <span>Delete Account</span>
              <span>Sign Out</span>
            </div>
          </Form>
          <p className="mt-4 text-center fw-medium">
            {" "}
            <span>Show listings </span>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
