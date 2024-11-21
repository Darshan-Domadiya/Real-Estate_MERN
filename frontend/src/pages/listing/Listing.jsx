import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./listing.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { ImLocation2 } from "react-icons/im";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";

const Listing = () => {
  const { listingId } = useParams();
  const [showListing, setShowListing] = useState(null);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const getListing = async () => {
      try {
        const response = await axios.get(
          `/api/listing/single-listing/${listingId}`
        );
        if (response.status === 200) {
          console.log("listings", response.data);
          setShowListing(response.data.singleListing);
        }
      } catch (error) {
        console.log("ERROR while getting listings", error);
      }
    };
    getListing();
  }, []);

  console.log(showListing);

  return (
    <Container fluid>
      <Row>
        <Col sm={12} className="p-0">
          <div>
            <Swiper navigation>
              {showListing &&
                showListing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className="swiperImage-div "
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </Col>
      </Row>
      <Row className="mt-3 mb-5">
        <Col md={{ span: 9, offset: 2 }} sm={12} xl={{ span: 7, offset: 3 }}>
          {showListing && (
            <div>
              <div className="d-flex align-items-center flex-wrap fw-semibold fs-4">
                {" "}
                <p> {showListing.name} - </p>
                <p>$ {showListing.regularPrice}</p>
              </div>

              <div className="d-flex align-items-center gap-2">
                <ImLocation2 />
                <span className="small text-secondary fw-semibold">
                  {showListing.address}
                </span>
              </div>

              <div className="mt-3 d-flex flex-column flex-sm-row gap-3">
                <span className="bg-danger p-width p-1 text-white fw-bold text-center rounded-2">
                  For {showListing.type === "sell" ? "Sale" : "Rent"}{" "}
                  {showListing.type === "rent" && <span>/ month</span>}
                </span>
                {showListing.offer === true && (
                  <span className="bg-success p-width p-1 text-white fw-bold text-center rounded-2">
                    Discount ${" "}
                    {showListing.regularPrice - showListing.discountedPrice}
                  </span>
                )}
              </div>

              <div className="mt-3">
                <p className="fw-bold">
                  Description:{" "}
                  <span className="text-black fw-lighter">
                    {showListing.description}
                  </span>
                </p>
              </div>

              <div className="d-flex align-items-center gap-4 flex-wrap text-color">
                <div className="d-flex align-items-center gap-1 small fw-bold">
                  <FaBed size={20} />
                  <span>{showListing.bedrooms}</span>
                  <span>Beds</span>
                </div>
                <div className="d-flex align-items-center gap-1 small fw-bold">
                  <FaBath size={20} />
                  <span>{showListing.bathrooms}</span>
                  <span>Baths</span>
                </div>
                <div className="d-flex align-items-center gap-1 small fw-bold">
                  <FaParking size={20} />

                  <span>
                    {showListing.parking === true
                      ? "Parking Spot"
                      : "No Parking"}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-1 small fw-bold">
                  <FaChair size={20} />
                  <span>
                    {showListing.furnished === true
                      ? "Furnished"
                      : "Not Furnished"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Listing;
