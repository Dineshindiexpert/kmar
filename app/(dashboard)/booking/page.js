"use client";

import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "deluxe",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    alert("Booking Submitted Successfully!");
  };

  return (
    <div className="py-5" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card
              className="border-0 shadow-lg rounded-4 p-4"
              style={{ background: "#fff" }}
            >
              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-1">Hotel Room Booking</h2>
                <p className="text-muted">
                  Fill details to reserve your stay
                </p>
              </div>

              <Form onSubmit={handleSubmit}>

                {/* Name */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="py-2 rounded-3"
                    required
                  />
                </Form.Group>

                {/* Email + Phone */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="py-2 rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="py-2 rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Dates */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Check-In
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        className="py-2 rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Check-Out
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        className="py-2 rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Guests + Room */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Guests
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="guests"
                        min={1}
                        value={formData.guests}
                        onChange={handleChange}
                        className="py-2 rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Room Type
                      </Form.Label>
                      <Form.Select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                        className="py-2 rounded-3"
                      >
                        <option value="deluxe">Deluxe Room</option>
                        <option value="superior">Superior Room</option>
                        <option value="suite">Suite</option>
                        <option value="presidential">
                          Presidential Suite
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Notes */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    Special Requests
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    placeholder="Extra bed, view preference, etc..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="rounded-3"
                  />
                </Form.Group>

                {/* Button */}
                <Button
                  type="submit"
                  className="w-100 py-2 rounded-3 fw-semibold"
                  style={{
                    background: "#DC3545",
                    border: "none",
                    fontSize: "16px"
                  }}
                >
                  Confirm Booking
                </Button>

              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Booking;