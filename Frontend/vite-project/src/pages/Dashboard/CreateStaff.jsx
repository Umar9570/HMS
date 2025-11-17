import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Card, Row, Col, Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axios";
import { toast } from "react-toastify";

const CreateStaff = () => {
  const { user: currentUser } = useContext(AuthContext); // logged-in user
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "receptionist",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [availableRoles, setAvailableRoles] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const roles = [];
      if (currentUser.role === "admin") roles.push("admin", "manager", "receptionist", "housekeeper");
      else if (currentUser.role === "manager") roles.push("receptionist", "housekeeper");
      setAvailableRoles(roles);
      if (!roles.includes(formData.role)) {
        setFormData((prev) => ({ ...prev, role: roles[0] }));
      }
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { data } = await api.post("/auth/create-staff", formData);

      if (data.status) {
        setMessage({ type: "success", text: `Staff (${formData.role}) created successfully!` });
        toast.success(`Staff (${formData.role}) created successfully`);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          role: availableRoles[0] || "receptionist",
        });
      } else {
        setMessage({ type: "danger", text: data.message || "Failed to create staff" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Server error. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Body className="p-4">
              <h4 className="fw-semibold mb-3 text-secondary text-center">
                Create New Staff
              </h4>
              <p className="text-muted text-center mb-4">
                Fill in the details below to register a new staff member.
              </p>

              {message.text && <Alert variant={message.type}>{message.text}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Form.Group className="mb-3 col-6" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-6" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Temporary Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Set a temporary password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="role">
                  <Form.Label>Assign Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    {availableRoles.map((r) => (
                      <option key={r} value={r}>
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={loading} className="py-2 fw-semibold">
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Creating...
                      </>
                    ) : (
                      "Create Staff"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Inline styles */}
      <style>{`
        .form-label { font-weight: 500; color: #475569; }
        .form-control, .form-select { border-radius: 10px; padding: 10px 12px; }
        .btn-primary {
          background-color: #1099a8; border-color: #1099a8; border-radius: 10px; transition: all 0.3s ease;
        }
        .btn-primary:hover { background-color: #0e8997; border-color: #0e8997; }
      `}</style>
    </div>
  );
};

export default CreateStaff;
