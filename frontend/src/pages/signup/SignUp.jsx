import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./signup.scss";
import { Link } from "react-router-dom";
import "./signup.scss";

const SignUp = () => {
  return (
    <Container className="mt-5">
      <p className="text-center fs-2 fw-bold">Sign Up</p>
      <Row className=" d-flex align-items-center justify-content-center ">
        <Col sm={12} md={8} lg={6} xl={5}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className="bg-secondary-subtle p-3"
                type="text"
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className="bg-secondary-subtle p-3"
                type="email"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className="bg-secondary-subtle p-3"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <div className="d-flex flex-column gap-2">
              <Button className="btn-dark p-3 fw-bold">Sign Up</Button>
              <Button className="btn-danger mt-1  p-3 fw-bold">
                Sign In with Google
              </Button>
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
