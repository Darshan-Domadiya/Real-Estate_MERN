import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import "./signup.scss";
import axios from "axios";
import SpinnerComponent from "../../components/SpinnerComponent";
import OAuth from "../../components/OAuth";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        console.log("User signup successfully!", response.data);
        navigate("/signin");
      }
    } catch (error) {
      console.log("ERROR while sign up!", error);
    }
  };

  return (
    <Container className="mt-5">
      <p className="text-center fs-2 fw-bold">Sign Up</p>
      <Row className=" d-flex align-items-center justify-content-center ">
        <Col sm={12} md={8} lg={6} xl={5}>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                className="bg-secondary-subtle p-3"
                type="text"
                placeholder="Username"
                onChange={handleInputChange}
                name="username"
                value={formData.username}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                className="bg-secondary-subtle p-3"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                className="bg-secondary-subtle p-3"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="d-flex flex-column gap-2">
              <Button className="btn-dark p-3 fw-bold" type="submit">
                Sign Up
              </Button>
              <OAuth />
            </div>
            <div className="mt-2">
              <p>
                Have an Account?
                <Link to="/signin" className="text-decoration-none">
                  {" "}
                  <span className="fw-bold signin">Sign In</span>
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
