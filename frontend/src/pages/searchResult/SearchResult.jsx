import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./searchResults.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ImLocation2 } from "react-icons/im";

const SearchResult = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  //   console.log(searchData);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSearchData({ ...searchData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSearchData({
        ...searchData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? "true" : "false",
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSearchData({ ...searchData, sort, order });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    params.set("searchTerm", searchData.searchTerm);
    params.set("type", searchData.type);
    params.set("parking", searchData.parking);
    params.set("furnished", searchData.furnished);
    params.set("offer", searchData.offer);
    params.set("sort", searchData.sort);
    params.set("order", searchData.order);

    const searchQuery = params.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const urlSearchTerm = urlParams.get("searchTerm");
    const urlType = urlParams.get("type");
    const urlParking = urlParams.get("parking");
    const urlFurnished = urlParams.get("furnished");
    const urlOffer = urlParams.get("offer");
    const urlSort = urlParams.get("sort");
    const urlOrder = urlParams.get("order");

    if (
      urlSearchTerm ||
      urlType ||
      urlParking ||
      urlFurnished ||
      urlOffer ||
      urlSort ||
      urlOrder
    ) {
      setSearchData({
        searchTerm: urlSearchTerm || "",
        type: urlType || "all",
        parking: urlParking === "true" ? true : false,
        furnished: urlFurnished === "true" ? true : false,
        offer: urlOffer === "true" ? true : false,
        sort: urlSort || "created_at",
        order: urlOrder || "desc",
      });
    }

    const getListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const response = await axios.get(
        `/api/listing/getListings?${searchQuery}`
      );

      if (response.status === 200) {
        setLoading(false);
        setListings(response.data.listings);
        console.log("All listings!", response.data.listings);
      }
    };

    getListings();
  }, [location.search]);

  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={5} lg={4} xl={4} className="filters-col  ">
          <div className="d-flex flex-column mx-4 mt-3 gap-1">
            <Form onSubmit={handleFormSubmit}>
              <div className="d-flex align-items-center gap-3 mt-4 ">
                <span>Search Term :</span>
                <Form.Control
                  id="searchTerm"
                  type="text"
                  className="w-50 p-2 bg-light-subtle"
                  placeholder="Search..."
                  onChange={handleChange}
                  value={searchData.searchTerm}
                />
              </div>

              <div className="mt-4 d-flex flex-wrap gap-3 align-items-center ">
                <div className="d-flex align-items-center gap-2">
                  <span>Type:</span>
                  <div className="d-flex align-items-center gap-2">
                    <Form.Check
                      id="all"
                      onChange={handleChange}
                      checked={searchData.type === "all"}
                    />
                    <span>Rent & Sale</span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Form.Check
                    id="rent"
                    onChange={handleChange}
                    checked={searchData.type === "rent"}
                  />
                  <span>Rent </span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Form.Check
                    id="sell"
                    onChange={handleChange}
                    checked={searchData.type === "sell"}
                  />
                  <span>Sale</span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Form.Check
                    id="offer"
                    onChange={handleChange}
                    checked={searchData.offer}
                  />
                  <span>Offer</span>
                </div>
              </div>

              <div className="mt-4 d-flex flex-wrap gap-2 gap-sm-3 align-items-center ">
                <div className="d-flex align-items-center gap-1 gap-sm-2">
                  <span>Amenities:</span>
                  <div className="d-flex align-items-center gap-1 gap-sm-2">
                    <Form.Check
                      id="parking"
                      onChange={handleChange}
                      checked={searchData.parking}
                    />
                    <span>Parking</span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-1 gap-sm-2">
                  <Form.Check
                    id="furnished"
                    onChange={handleChange}
                    checked={searchData.furnished}
                  />
                  <span>Furnished </span>
                </div>
              </div>

              <div className="d-flex align-items-center mt-4 gap-3">
                <label htmlFor="sort">Sort :</label>
                <select
                  onChange={handleChange}
                  defaultValue={"createdAt_desc"}
                  id="sort_order"
                  className="p-3 border-0 bg-body-secondary rounded-3"
                >
                  <option value="createdAt_desc">Oldest</option>
                  <option value="createdAt_asc">Latest</option>
                  <option value="regularPrice_asc">Price Low to High</option>
                  <option value="regularPrice_desc">Price High to Low</option>
                </select>
              </div>
              <div>
                <Button
                  variant="secondary"
                  className="w-100 mt-4 p-2 fw-bold"
                  type="submit"
                >
                  Search
                </Button>
              </div>
            </Form>
          </div>
        </Col>

        <Col sm={12} md={7} lg={8} xl={8} className="p-3">
          <p className="underline fs-3 fw-medium text-secondary-emphasis">
            Listing Results:
          </p>

          <Row>
            {listings.map((list) => (
              <Col
                sm={12}
                md={12}
                lg={6}
                xl={4}
                key={list._id}
                className="mt-3 "
              >
                <Link
                  to={`/listing/${list._id}`}
                  className="text-decoration-none"
                >
                  <Card className="card" style={{ width: "20rem" }}>
                    <Card.Img
                      variant="top"
                      height="250px"
                      className="card-img"
                      src={list.imageUrls[0]}
                    />
                    <Card.Body>
                      <Card.Title className="text-truncate">{list.name}</Card.Title>

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
        </Col>
      </Row>
    </Container>
  );
};

export default SearchResult;
