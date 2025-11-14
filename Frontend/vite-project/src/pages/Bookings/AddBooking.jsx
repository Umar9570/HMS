import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

const AddBooking = () => {
  // Dummy rooms data
  const [rooms] = useState([
    { _id: "1", roomNumber: "101", roomType: "single", pricePerNight: 2000, status: "available" },
    { _id: "2", roomNumber: "102", roomType: "single", pricePerNight: 2100, status: "occupied" },
    { _id: "3", roomNumber: "203", roomType: "double", pricePerNight: 3000, status: "available" },
    { _id: "4", roomNumber: "305", roomType: "suite", pricePerNight: 5000, status: "available" },
    { _id: "5", roomNumber: "402", roomType: "deluxe", pricePerNight: 4500, status: "maintenance" },
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    roomType: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    totalPrice: "",
  });

  const [availableRooms, setAvailableRooms] = useState([]);

  // Update available rooms based on selected type
  useEffect(() => {
    if (formData.roomType) {
      const filtered = rooms.filter(
        (r) => r.roomType === formData.roomType && r.status === "available"
      );
      setAvailableRooms(filtered);
    } else {
      setAvailableRooms([]);
    }
  }, [formData.roomType, rooms]);

  // Calculate total price based on dates and selected room
  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate && formData.roomId) {
      const selectedRoom = rooms.find((r) => r._id === formData.roomId);
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const nights = Math.max(
        1,
        Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      );
      setFormData((prev) => ({
        ...prev,
        totalPrice: selectedRoom ? nights * selectedRoom.pricePerNight : "",
      }));
    }
  }, [formData.checkInDate, formData.checkOutDate, formData.roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Created:", formData);
    alert("Booking added successfully!");
    // In real app: send to backend
  };

  return (
    <div className="p-md-4">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h4 className="fw-semibold text-secondary mb-0">Add New Booking</h4>
      </div>

      <Card className="shadow-sm border-0">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <h5 className="mb-3 text-muted">Guest Information</h5>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mb-3 text-muted">Room Selection</h5>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select room type</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="suite">Suite</option>
                    <option value="deluxe">Deluxe</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Room</Form.Label>
                  <Form.Select
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    disabled={!formData.roomType || availableRooms.length === 0}
                    required
                  >
                    <option value="">
                      {availableRooms.length
                        ? "Select available room"
                        : "No rooms available"}
                    </option>
                    {availableRooms.map((room) => (
                      <option key={room._id} value={room._id}>
                        Room {room.roomNumber} — ₹{room.pricePerNight}/night
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mb-3 text-muted">Booking Details</h5>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Check-In Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Check-Out Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Guests</Form.Label>
                  <Form.Control
                    type="number"
                    name="numberOfGuests"
                    min="1"
                    value={formData.numberOfGuests}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Total Price (₹)</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.totalPrice}
                    readOnly
                    placeholder="Auto calculated"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              <Button type="submit" variant="success" className="px-4">
                <i className="bi bi-check2-circle me-2"></i>Confirm Booking
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Inline Styles */}
      <style>{`
        .card {
          border-radius: 14px;
        }
        h5 {
          font-weight: 600;
        }
        .form-control, .form-select {
          border-radius: 8px;
        }
        button {
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        button:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default AddBooking;
