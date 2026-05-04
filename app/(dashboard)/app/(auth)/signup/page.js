"use client";

import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/app/api/endpoints";

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    emailid: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setValidated(true);
      return;
    }

    try {
      setError("");

      const res = await apiService.createUser({
        username: formData.username,
        emailid: formData.emailid,
        password: formData.password
      });
       

       router.push("/signin");
    } catch (err) {
      setError("Signup failed!");
    }

    setValidated(true);
  };

  return (
    <Container fluid className="vh-100" style={{ background: "#F4F4F4" }}>
      <Row className="h-100">

        <Col md={6} className="d-none d-md-flex flex-column justify-content-center px-5">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="fw-bold mb-3">Create Your Account</h1>
            <h4 className="text-secondary">
              Join us to manage rooms, track bookings, and grow your business easily.
            </h4>
          </div>
        </Col>

        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">

          <Card className="border-0 shadow-sm p-4 w-100 rounded-4" style={{ maxWidth: "420px" }}>

            <h3 className="text-center mb-4 fw-semibold">Sign Up</h3>

            {error && (
              <div className="text-danger mb-2 text-center">
                {error}
              </div>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="emailid"
                  value={formData.emailid}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 rounded-4 py-2"
                style={{ background: "#DC3545" }}
              >
                Create Account
              </Button>

              <div className="text-center my-3 text-secondary">or</div>

              <Button
                variant="light"
                className="w-100 rounded-4 border py-2 mb-3"
              >
                Continue with Google
              </Button>

              <div className="text-center">
                <span className="text-secondary">Already have an account? </span>
                <a href="/signin" className="fw-semibold text-danger text-decoration-none">
                  Sign in
                </a>
              </div>

            </Form>

          </Card>

        </Col>
      </Row>
    </Container>
  );
};

export default Signup;