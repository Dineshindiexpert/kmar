"use client";

import { RoomsData } from "@/data/RoomData";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Badge, Button, Col, Row, Card, Container } from "react-bootstrap";
import { BiLeftArrow } from "react-icons/bi";
import { BsBoxFill, BsStarFill } from "react-icons/bs";
import { LockIcon, ShowerHead } from "lucide-react";
import { TbLockBitcoin } from "react-icons/tb";
import { PiCloudCheckFill } from "react-icons/pi";
import { FaBellConcierge } from "react-icons/fa6";

const RoomDetailPage = () => {
  const params = useParams();
  const roomId = params.id;
  const router = useRouter();

  const room = RoomsData.find((r) => r.id.toString() === roomId);

  if (!room) {
    return (
      <Container className="mt-5 text-center">
        <h3 className="text-danger fw-bold">Room not found</h3>
        <Button
          className="mt-3 px-4 rounded-pill"
          variant="warning"
          onClick={() => router.push("/rooms")}
        >
          Back to Rooms
        </Button>
      </Container>
    );
  }

  return (
    <div className="py-4 bg-app">

      <div>

        {/* BACK BUTTON */}
        <Button
          variant="light"
          onClick={() => router.push("/rooms")}
          className="d-inline-flex align-items-center gap-2 mb-4 px-4 py-2 rounded-pill shadow-sm border"
        >
          <BiLeftArrow />
          Back
        </Button>

        <Row className="g-4">

          {/* IMAGE */}
          <Col lg={6}>
            <Card className="border-0 rounded-4 overflow-hidden shadow-sm">

              <div className="position-relative">

                <Card.Img
                  src={room.image}
                  alt="room"
                  style={{
                    height: "380px",
                    objectFit: "cover"
                  }}
                />

                {/* DARK GRADIENT */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.35), transparent)"
                  }}
                />

                {/* STATUS BADGE */}
                <Badge
                  className={`position-absolute bottom-0 start-0 m-3 px-3 py-2 rounded-pill shadow-sm ${room.status === "BOOKED"
                      ? "bg-warning"
                      : "bg-success text-white"
                    }`}
                >
                  {room.status}
                </Badge>

              </div>

            </Card>
          </Col>

          {/* DETAILS */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm rounded-4 p-4 h-100">

              <h2 className="fw-bold mb-1">{room.name}</h2>
              <small className="text-muted">Room #{room.roomid}</small>

              {/* RATING */}
              <div className="d-flex align-items-center gap-2 mt-3 mb-3">
                <BsStarFill className="text-warning" />
                 <BsStarFill className="text-warning" /> 
                 <BsStarFill className="text-warning" /> 
                 <BsStarFill className="text-warning" />
                <span className="fw-semibold">{room.rating}</span>
                <span className="text-muted">
                  ({room.reviews} reviews)
                </span>
              </div>

              <p className="text-muted mb-4">
                Modern and comfortable stay with premium interiors, perfect
                for business and leisure travelers.
              </p>

              {/* HIGHLIGHT */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <BsBoxFill className="text-warning" />
                <span className="fw-medium">Spacious Premium Interior</span>
              </div>

              {/* INFO */}
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span className="text-muted">Floor</span>
                <span className="fw-medium">{room.floor}</span>
              </div>

              <div className="d-flex justify-content-between py-2 mb-3">
                <span className="text-muted">Bed Type</span>
                <span className="fw-medium">{room.bedType}</span>
              </div>

              {/* CTA */}
              {/* CTA */}
              <Button
                className="w-100 py-3 rounded-pill fw-semibold shadow-sm"
                variant={room.status === "BOOKED" ? "warning" : "success"}
                disabled={room.status === "BOOKED"}
              >
                {room.status === "BOOKED" ? "Already Booked" : "Book Now"}
              </Button>

            </Card>
          </Col>

          {/* AMENITIES */}
          <Col md={12}>
            <Card className=" d-flex border-0 shadow-sm rounded-4 p-4">

              <h5 className="fw-bold mb-4">Amenities</h5>

              <Row className="g-3 text-center">

                <Col md={3}>
                  <div className="p-3 rounded-4 bg-light transition text-center hover-bg-light">
                    <ShowerHead size={40} />
                    <p className="mb-0 mt-2 fw-medium">Shower</p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="p-3 rounded-4 bg-light">
                    <FaBellConcierge size={40} />
                    <p className="mb-0 mt-2 fw-medium">Concierge</p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="p-3 rounded-4 bg-light">
                    <TbLockBitcoin size={40} />
                    <p className="mb-0 mt-2 fw-medium">Safe</p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="p-3 rounded-4 bg-light">
                    <PiCloudCheckFill size={40} />
                    <p className="mb-0 mt-2 fw-medium">24/7 Service</p>
                  </div>
                </Col>

              </Row>

              <hr className="my-4" />

              <p className="text-muted mb-0 text-center">
                Free cancellation available up to 24 hours before check-in.
              </p>

            </Card>
          </Col>

        </Row>

      </div>
    </div>
  );
};

export default RoomDetailPage;