import { Button } from "react-bootstrap";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../store/userSlices/userSlice.js";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log("result of oauth", result.user);

      const response = await axios.post("/api/auth/google", {
        username: result.user.displayName,
        email: result.user.email,
        profileImage: result.user.photoURL,
      });

      if (response.status === 200) {
        dispatch(signInSuccess(response.data.user));
        navigate("/");

        console.log(
          "user signed with google successfully!",
          response.data.user
        );
      }
    } catch (error) {
      console.log("ERROR while sign with google!", error);
    }
  };

  return (
    <Button onClick={handleGoogleClick} className="btn-danger fw-medium p-3">
      Continue With Google
    </Button>
  );
};

export default OAuth;
