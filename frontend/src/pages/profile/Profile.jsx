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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  deleteUserDetails,
  updateUserDetails,
} from "../../store/userSlices/userSlice.js";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [profileImageData, setProfileImageData] = useState({});
  const [imageError, setImageError] = useState(false);
  const [showUserListings, setShowUserListings] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  // Uploading image...
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Updating user details
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/user/update/${currentUser._id}`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profileImage: profileImageData.profileImage || currentUser.profileImage,
      });

      if (response.status === 200) {
        dispatch(updateUserDetails(response.data.user));
        console.log("User details updated successfully!", response.data);
      }
    } catch (error) {
      console.log("ERROR while updating user details!", error);
    }
  };

  // User sign out.
  const handleSignOutClick = async () => {
    try {
      const response = await axios.get("/api/auth/signout");
      if (response.status === 200) {
        console.log("User signed out sucessfully!", response);
        navigate("/");
        dispatch(deleteUserDetails());
      }
    } catch (error) {
      console.log("Error while sign out!", error);
    }
  };

  // Delete user account.
  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(
        `/api/user/delete/${currentUser._id}`
      );
      if (response.status === 200) {
        console.log("User deleted successfully!", response.data);
        dispatch(deleteUserDetails());
        navigate("/");
      }
    } catch (error) {
      console.log("Error while deleting the user!", error);
    }
  };

  // Show user's listings...
  const handleShowListingsClick = async () => {
    try {
      const response = await axios.get(`/api/user/listing/${currentUser._id}`);

      if (response.status === 200) {
        console.log("User listings", response.data);
        setShowUserListings(response.data.listings);
      }
    } catch (error) {
      console.log("ERROR while showing listings!", error);
    }
  };

  const handleDeleteListingClick = async (id) => {
    try {
      const response = await axios.delete(`/api/listing/delete-listing/${id}`);
      if (response.status === 200) {
        console.log("User listing deleted successfully!", response.data);
      }
      setShowUserListings((prev) =>
        prev.filter((listing) => listing._id !== id)
      );
    } catch (error) {
      console.log("ERROR while deleting the listing!", error);
    }
  };

  console.log(showUserListings);
  return (
    <Container className="mt-5 ">
      <p className="fs-2 fw-bold text-center">PROFILE</p>

      <Row className="d-flex align-items-center justify-content-center">
        <Col xl={5} lg={6} md={6} sm={12}>
          <input
            type="file"
            ref={imageRef}
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Form className="text-center" onSubmit={handleUpdateSubmit}>
            <div className="d-flex flex-column text-center mb-2">
              <div className="">
                <Image
                  src={
                    profileImageData.profileImage || currentUser.profileImage
                  }
                  alt="Profile Image"
                  className="img-fluid object-fit-cover rounded-3 mb-3 border"
                  width="130px"
                  height="130px"
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
                defaultValue={currentUser.username}
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
                defaultValue={currentUser.email}
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
              <Button className="btn-dark p-3 fw-medium" type="submit">
                Update
              </Button>
              <Button
                className="btn-success mt-1 p-3 fw-medium"
                onClick={() => navigate("/create-listing")}
              >
                Create Listing
              </Button>
            </div>
          </Form>
          <div className="d-flex align-items-center justify-content-between mt-1 text-danger">
            <span
              className="fw-medium"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteClick}
            >
              Delete Account
            </span>
            <span
              className="fw-medium"
              style={{ cursor: "pointer" }}
              onClick={handleSignOutClick}
            >
              Sign Out
            </span>
          </div>
          <p className="mt-4 text-center fw-medium">
            {" "}
            <span
              className="text-success cursor-pointer"
              onClick={handleShowListingsClick}
            >
              Show listings{" "}
            </span>
          </p>

          {showUserListings && showUserListings.length > 0 && (
            <div>
              <p className="fw-bold fs-3 text-center">Your Listings</p>
              {showUserListings.map((listing) => (
                <div
                  key={listing._id}
                  className="border rounded-3 d-flex align-items-center justify-content-between p-3 mb-2"
                >
                  <Link to={`/listing/${listing._id}`}>
                    <Image
                      src={listing.imageUrls[0]}
                      className="img-fluid object-fit-cover"
                      height="80px"
                      width="80px"
                    />
                  </Link>
                  <Link to={`/listing/${listing._id}`}>
                    <p className="listing-name fw-medium text-truncate">
                      {listing.name}
                    </p>
                  </Link>
                  <div className="d-flex flex-column align-items-center fw=-medium cursor-pointer">
                    <span
                      className="text-danger"
                      onClick={() => handleDeleteListingClick(listing._id)}
                    >
                      DELETE
                    </span>
                    <span className="text-success">EDIT</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
