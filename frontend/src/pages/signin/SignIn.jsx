import React from "react";
import "./signin.scss";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <Container>
      <p className="fw-bold fs-2 text-center mt-5">Sign In</p>
      <Row className="d-flex align-items-center justify-content-center">
        <Col sm={12} md={8} lg={6} xl={5}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                className="p-3 bg-secondary-subtle"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                className="p-3 bg-secondary-subtle"
                placeholder="Password"
              />
            </Form.Group>
            <div className="d-flex flex-column gap-2 ">
              <Button className="p-3 btn-dark fw-bold">Sign In</Button>
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
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
