import React, { useState } from "react";
import "./signin.scss";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../store/userSlices/userSlice";
import SpinnerComponent from "../../components/SpinnerComponent";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const response = await axios.post("/api/auth/signin", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        dispatch(signInSuccess(response.data));
        console.log("User logged in successfully!", response.data);
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.response.data));
      console.log("ERROR while signin", error.response.data);
    }
  };

  return (
    <Container>
      <p className="fw-bold fs-2 text-center mt-5">Sign In</p>
      <Row className="d-flex align-items-center justify-content-center">
        <Col sm={12} md={8} lg={6} xl={5}>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                className="p-3 bg-secondary-subtle"
                placeholder="Email"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                className="p-3 bg-secondary-subtle"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="d-flex flex-column gap-2 ">
              <Button className="p-3 btn-dark fw-bold" type="submit">
                {isLoading ? <SpinnerComponent /> : "Sign In"}
              </Button>
              <Button className="p-3 btn-danger fw-bold">
                Continue with Google
              </Button>
            </div>
          </Form>
          <div className="mt-2">
            <p>
              Do not have an Account?{" "}
              <Link to="/signup" className="text-decoration-none">
                <span className="signup fw-bold">Sign Up</span>
              </Link>
            </p>
          </div>
          <div>
            <p className="text-center text-danger">
              {isError != null ? isError.message : ""}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
