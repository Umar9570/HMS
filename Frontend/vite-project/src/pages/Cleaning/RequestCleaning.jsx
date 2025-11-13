import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

const RequestCleaning = () => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    issue: "",
    assignedTo: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Dummy room numbers and staff (in a real app, these will come from API)
  const rooms = ["101", "102", "203", "305", "401", "503"];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { roomNumber, issue } = formData;
    const newErrors = {};
    if (!roomNumber) newErrors.roomNumber = "Room number is required";
    if (!issue) newErrors.issue = "Please describe the issue";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Cleaning Request Submitted:", formData);

      // Simulate successful submission
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Reset form
      setFormData({ roomNumber: "", issue: "", assignedTo: "" });
    }
  };

  return (
    <div className="p-4">
      <h4 className="fw-semibold text-secondary mb-4">Request Room Cleaning</h4>

      <Card className="shadow-sm border-0">
        <Card.Body>
          {showSuccess && (
            <Alert variant="success" className="fw-semibold">
              ✅ Cleaning request successfully submitted!
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Room Number */}
            <Form.Group className="mb-3" controlId="roomNumber">
              <Form.Label className="fw-semibold">Room Number</Form.Label>
              <Form.Select
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                isInvalid={!!errors.roomNumber}
              >
                <option value="">Select a room</option>
                {rooms.map((num) => (
                  <option key={num} value={num}>
                    Room {num}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.roomNumber}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Issue Description */}
            <Form.Group className="mb-3" controlId="issue">
              <Form.Label className="fw-semibold">Issue / Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="issue"
                placeholder="Describe what needs cleaning..."
                value={formData.issue}
                onChange={handleChange}
                isInvalid={!!errors.issue}
              />
              <Form.Control.Feedback type="invalid">
                {errors.issue}
              </Form.Control.Feedback>
            </Form.Group>


            {/* Submit */}
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary" className="px-4 py-2">
                <i className="bi bi-send me-2"></i>Submit Request
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <style>{`
        .card {
          border-radius: 14px;
          transition: all 0.25s ease;
        }
        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.07);
        }
        .btn {
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 576px) {
          .card {
            border-radius: 10px;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RequestCleaning;
