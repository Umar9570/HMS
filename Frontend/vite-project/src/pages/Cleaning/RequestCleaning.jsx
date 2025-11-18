import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const RequestCleaning = () => {
  const { user } = useContext(AuthContext);

  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [formData, setFormData] = useState({ roomId: "", issue: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await api.get("/rooms");
        setRooms(data); // API returns an array directly
      } catch (error) {
        console.error("Failed to fetch rooms", error);
      } finally {
        setLoadingRooms(false);
      }
    };
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { roomId, issue } = formData;
    const newErrors = {};
    if (!roomId) newErrors.roomId = "Select a room";
    if (!issue) newErrors.issue = "Issue description is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    try {
      const payload = { roomId, issue };

      // Include reportedBy if req.user is not available on backend
      if (user && user.id) payload.reportedBy = user.id;

      const { data } = await api.post("/cleaning", payload);

      if (data.status) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setFormData({ roomId: "", issue: "" });
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Error submitting request. Make sure you're logged in.");
    } finally {
      setSubmitting(false);
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

          {loadingRooms ? (
            <div className="text-center my-3">
              <Spinner animation="border" />
              <p className="mt-2">Loading rooms...</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="room">
                <Form.Label className="fw-semibold">Room</Form.Label>
                <Form.Select
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  isInvalid={!!errors.roomId}
                >
                  <option value="">Select a room</option>
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      Room {room.roomNumber}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.roomId}</Form.Control.Feedback>
              </Form.Group>

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
                <Form.Control.Feedback type="invalid">{errors.issue}</Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button type="submit" variant="primary" className="px-4 py-2" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Spinner size="sm" animation="border" className="me-2" /> Submitting...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send me-2"></i>Submit Request
                    </>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>

      <style>{`
        .card { border-radius: 14px; transition: all 0.25s ease; }
        .card:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(0,0,0,0.07); }
        .btn { border-radius: 8px; transition: all 0.3s ease; }
        .btn:hover { transform: translateY(-2px); }
      `}</style>
    </div>
  );
};

export default RequestCleaning;
