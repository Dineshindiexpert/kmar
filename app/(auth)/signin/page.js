"use client";

import { useRouter } from "next/navigation";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { apiService } from "../../api/endpoints";
import Link from "next/link";

const Signin = () => {
  const router = useRouter();

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const res = await apiService.getUsers();
      // console.log("API response:", res);

      const user = res.data.find(
        (u) =>
          u.emailid === formData.username &&
          u.password === formData.password
      );


      if (!user) {
        setError("Invalid username or password");
        setValidated(true);
        return;
      }

      // FIXED: localStorage bug
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);
      localStorage.setItem("token", "logged_in_user");
      localStorage.setItem("isLoggedIn", "true");

      // FIXED: cookie path

      document.cookie = "token=logged_in_user; path=/; max-age=3600; SameSite=Lax";

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }

    setValidated(true);
  };

  return (
    <Container fluid className="vh-100" style={{ background: "#F4F4F4" }}>
      <Row className="h-100">

        {/* LEFT SIDE */}
        <Col
          md={6}
          className="d-none d-md-flex flex-column justify-content-center px-5"
        >
          <div className="d-flex justify-content-center gap-3">
            <img src="/assets/icons/Logo.svg" alt="logo" />
            <img src="/assets/icons/kmarlogo.png" alt="logo" />
          </div>
        </Col>

        {/* RIGHT SIDE */}
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Card
            className="border-0 shadow-sm p-4 w-100 rounded-4"
            style={{ maxWidth: "420px", background: "#FFFFFF" }}
          >
            <h3 className="text-center mb-4 fw-semibold">Sign In</h3>

            {error && (
              <div className="alert alert-danger py-2 text-center">
                {error}
              </div>
            )}

            <Form onSubmit={handleSubmit} noValidate validated={validated}>

              {/* USERNAME */}
              <Form.Group className="mb-3">
                <Form.Label className="text-secondary">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="rounded-4 border-0"
                  style={{ background: "#F4F4F4", padding: "12px" }}
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* PASSWORD */}
              <Form.Group className="mb-2">
                <Form.Label className="text-secondary">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="rounded-4 border-0"
                  style={{ background: "#F4F4F4", padding: "12px" }}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* FORGOT */}
              <div className="text-end mb-3">
                <button
                  type="button"
                  className="small text-secondary border-0 bg-transparent p-0"
                >
                  Forgot password?
                </button>
              </div>

              {/* LOGIN */}
              <Button
                type="submit"
                className="w-100 rounded-4 border-0 py-2"
                style={{ background: "#DC3545", fontWeight: 500 }}
              >
                Login
              </Button>

              {/* DIVIDER */}
              <div className="text-center my-3 text-secondary">or</div>

              {/* GOOGLE */}
              <Button
                variant="light"
                className="w-100 rounded-4 border py-2 mb-3"
                style={{ background: "#F4F4F4" }}
              >
                Continue with Google
              </Button>

              {/* SIGNUP */}
              <div className="text-center">
                <span className="text-secondary">
                  Don't have an account?{" "}
                </span>

                <Link
                  href="/signup"
                  className="fw-semibold text-danger text-decoration-none"
                >
                  Sign up
                </Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;