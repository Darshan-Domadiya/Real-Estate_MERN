import React, { useRef } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import "./profile.scss";

const Profile = () => {
  const imageRef = useRef(null);

  return (
    <Container className="mt-5 ">
      <p className="fs-2 fw-bold text-center">PROFILE</p>

      <Row className="d-flex align-items-center justify-content-center">
        <Col xl={5}>
          <input type="file" ref={imageRef} hidden />
          <Form className="text-center">
            <Image
              src="./dodge.jpg"
              className="img-fluid object-fit-cover rounded-5 mb-3"
              width="180px"
              height="130px"
              onClick={() => imageRef.current.click()}
            />
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                className="bg-secondary-subtle p-3"
                placeholder="username"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                className="bg-secondary-subtle p-3"
                placeholder="email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                className="bg-secondary-subtle p-3"
                placeholder="password"
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
