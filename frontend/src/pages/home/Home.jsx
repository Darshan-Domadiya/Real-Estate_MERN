import React, { useEffect, useState } from "react";
import "./home.scss";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { ImLocation2 } from "react-icons/im";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setsaleListings] = useState([]);
  SwiperCore.use([Navigation]);

  console.log("offerlistings", offerListings);
  console.log(saleListings);
  console.log(rentListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const response = await axios.get(
          "/api/listing/getListings?offer=true&limit=4"
        );
        if (response.status === 200) {
          // console.log("Offer listings data!", response.data);
          setOfferListings(response.data.listings);
          fetchRentListings();
        }
      } catch (error) {
        console.log("Error while fetching offer listings", error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const response = await axios.get(
          "/api/listing/getListings?type=rent&limit=4"
        );
        if (response.status === 200) {
          // console.log("Rent listings data", response.data);
          setRentListings(response.data.listings);
          fetchSaleListings();
        }
      } catch (error) {
        console.log("Error while fetching the rent listings", error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const response = await axios.get(
          "/api/listing/getListings?type=sell&limit=4"
        );
        if (response.status === 200) {
          // console.log("sale listings data", response.data);
          setsaleListings(response.data.listings);
        }
      } catch (error) {
        console.log("Error while fetching the rent listings", error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} xl={6} className="offset-xl-1 mt-4 mt-sm-5">
            <div className="mt-5">
              <h1 className="fw-bold font-size ">
                Find your next <span className=" text-secondary">perfect</span>
                <br /> place with ease
              </h1>

              <p className="fw-light mt-3">
                Avenue Realtor will help you find your home fast, easy and
                comfortable.
                <br /> Our expert support are always available.
              </p>

              <Link to="/search" className="text-decoration-none ">
                <span className="start-text ">Lets Start Now...</span>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="mt-5 mb-5">
          <Col sm={12} className="p-0 m-0">
            <Swiper navigation>
              {offerListings &&
                offerListings.length > 0 &&
                offerListings.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className="swiperImage-div "
                      style={{
                        background: `url(${url.imageUrls[0]}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </Col>
        </Row>
      </Container>
      {/* for offer */}
      {offerListings && offerListings.length > 0 && (
        <Container className="mt-5 ">
          <Row>
            <span className="fs-4 fw-bold text-dark-emphasis">
              {" "}
              Recent Offers
            </span>
            <Link to={`/search?offer=true`} className="text-decoration-none">
              {" "}
              <span className="start-text">Show more offers</span>
            </Link>
            {offerListings &&
              offerListings.map((list) => (
                <Col
                  sm={12}
                  md={12}
                  lg={6}
                  xl={4}
                  key={list._id}
                  className="mt-4"
                >
                  <Link
                    to={`/listing/${list._id}`}
                    className="text-decoration-none"
                  >
                    <Card className="card" style={{ width: "22rem" }}>
                      <Card.Img
                        variant="top"
                        height="250px"
                        className="card-img"
                        src={list.imageUrls[0]}
                      />
                      <Card.Body>
                        <Card.Title className="text-truncate">
                          {list.name}
                        </Card.Title>

                        <div className="d-flex small align-items-center gap-1 mt-2">
                          <span className="text-success">
                            <ImLocation2 />
                          </span>
                          <span className="text-truncate">{list.address}</span>
                        </div>
                        <div className="small mt-2 text-truncate">
                          <span>{list.description}</span>
                        </div>

                        <div className="fw-bold text-secondary d-flex align-items-center mt-3">
                          $<span>{list.regularPrice}</span>
                          {list.type === "rent" && <span>/ month</span>}
                        </div>

                        <div className="small d-flex  gap-2 mt-3 fw-bold">
                          <span>
                            {list.bedrooms}{" "}
                            <span>{list.bedrooms > 1 ? "Beds" : "Bed"}</span>
                          </span>
                          <span>
                            {list.bathrooms}{" "}
                            <span>{list.bathrooms > 1 ? "Baths" : "Bath"}</span>{" "}
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
          </Row>
        </Container>
      )}
      {/* for offer */}
      {rentListings && rentListings.length > 0 && (
        <Container className="mt-5 mb-5">
          <Row>
            <span className="fs-4 fw-bold text-dark-emphasis">
              {" "}
              Recent Places for Rent
            </span>
            <Link to={`/search?type=rent`} className="text-decoration-none">
              {" "}
              <span className="start-text">Show more places for rent</span>
            </Link>
            {rentListings &&
              rentListings.map((list) => (
                <Col
                  sm={12}
                  md={12}
                  lg={6}
                  xl={4}
                  key={list._id}
                  className="mt-4"
                >
                  <Link
                    to={`/listing/${list._id}`}
                    className="text-decoration-none"
                  >
                    <Card className="card" style={{ width: "22rem" }}>
                      <Card.Img
                        variant="top"
                        height="250px"
                        className="card-img"
                        src={list.imageUrls[0]}
                      />
                      <Card.Body>
                        <Card.Title className="text-truncate">
                          {list.name}
                        </Card.Title>

                        <div className="d-flex small align-items-center gap-1 mt-2">
                          <span className="text-success">
                            <ImLocation2 />
                          </span>
                          <span className="text-truncate">{list.address}</span>
                        </div>
                        <div className="small mt-2 text-truncate">
                          <span>{list.description}</span>
                        </div>

                        <div className="fw-bold text-secondary d-flex align-items-center mt-3">
                          $<span>{list.regularPrice}</span>
                          {list.rent === true && <span>/ month</span>}
                        </div>

                        <div className="small d-flex  gap-2 mt-3 fw-bold">
                          <span>
                            {list.bedrooms}{" "}
                            <span>{list.bedrooms > 1 ? "Beds" : "Bed"}</span>
                          </span>
                          <span>
                            {list.bathrooms}{" "}
                            <span>{list.bathrooms > 1 ? "Baths" : "Bath"}</span>{" "}
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
          </Row>
        </Container>
      )}
      {/* for sale */}
      {saleListings && saleListings.length > 0 && (
        <Container className="mt-5 mb-5">
          <Row>
            <span className="fs-4 fw-bold text-dark-emphasis">
              {" "}
              Recent Places for Sale
            </span>
            <Link to={"/search?type=sell"} className="text-decoration-none">
              {" "}
              <span className="start-text">Show more places for Sale</span>
            </Link>
            {saleListings &&
              saleListings.map((list) => (
                <Col
                  sm={12}
                  md={12}
                  lg={6}
                  xl={4}
                  key={list._id}
                  className="mt-4"
                >
                  <Link
                    to={`/listing/${list._id}`}
                    className="text-decoration-none"
                  >
                    <Card className="card" style={{ width: "22rem" }}>
                      <Card.Img
                        variant="top"
                        height="250px"
                        className="card-img"
                        src={list.imageUrls[0]}
                      />
                      <Card.Body>
                        <Card.Title className="text-truncate">
                          {list.name}
                        </Card.Title>

                        <div className="d-flex small align-items-center gap-1 mt-2">
                          <span className="text-success">
                            <ImLocation2 />
                          </span>
                          <span className="text-truncate">{list.address}</span>
                        </div>
                        <div className="small mt-2 text-truncate">
                          <span>{list.description}</span>
                        </div>

                        <div className="fw-bold text-secondary d-flex align-items-center mt-3">
                          $<span>{list.regularPrice}</span>
                          {list.rent === true && <span>/ month</span>}
                        </div>

                        <div className="small d-flex  gap-2 mt-3 fw-bold">
                          <span>
                            {list.bedrooms}{" "}
                            <span>{list.bedrooms > 1 ? "Beds" : "Bed"}</span>
                          </span>
                          <span>
                            {list.bathrooms}{" "}
                            <span>{list.bathrooms > 1 ? "Baths" : "Bath"}</span>{" "}
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home;
