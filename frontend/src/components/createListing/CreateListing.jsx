import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const CreateListing = () => {
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
              <input type="file" className="p-2 p-md-3" />
            </div>
            <Button variant="outline-success" className="p-2 p-md-3">
              Upload
            </Button>
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
