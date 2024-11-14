import React from "react";
import { Button, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import "./header.scss";
import { useSelector } from "react-redux";

const Header = () => {
  const isUser = useSelector((state) => state.user.currentUser);

  return (
    <Navbar collapseOnSelect expand="md" className="bg-body-secondary p-3">
      <Container>
        <Navbar.Brand href="/">
          <div className="fw-bold">
            <span className="logo1">Avenue</span>
            <span className="logo2">Realtor</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto d-none d-md-flex">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/profile">
              {isUser ? (
                <div className="headerProfileImage-div d-flex align-items-center justify-content-center">
                  <Image
                    src={isUser.profileImage}
                    className=" object-fit-cover headerProfileImage"
                    height="100%"
                    width="100%"
                  />
                </div>
              ) : (
                " Sign In"
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Nav className="m-auto d-sm-none mt-3 w-100">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search..."
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Nav>
    </Navbar>
  );
};

export default Header;
