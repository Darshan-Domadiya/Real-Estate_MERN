import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import "./header.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isUser = useSelector((state) => state.user.currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);

    params.set("searchTerm", searchTerm);
    const searchQuery = params.toString();

    navigate(`search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder="Search..."
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
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
