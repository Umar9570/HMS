import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import api from "../../api/axios"; // your axios instance
import { toast } from "react-toastify";

const AddBooking = () => {
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);

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

  const today = new Date().toISOString().split("T")[0];

  // Fetch all rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await api.get("/rooms");
        setRooms(data || []);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        toast.error("Failed to fetch rooms");
      }
    };
    fetchRooms();
  }, []);

  // Update available rooms when room type changes
  useEffect(() => {
    if (formData.roomType) {
      const filtered = rooms.filter(
        (r) => r.roomType === formData.roomType && r.status === "available"
      );
      setAvailableRooms(filtered);
    } else {
      setAvailableRooms([]);
    }
    setFormData((prev) => ({ ...prev, roomId: "" })); // reset selected room
  }, [formData.roomType, rooms]);

  // Calculate total price when room or dates change
  useEffect(() => {
    if (formData.roomId && formData.checkInDate && formData.checkOutDate) {
      const room = rooms.find((r) => r._id === formData.roomId);
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const nights = Math.max(
        1,
        Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      );
      setFormData((prev) => ({
        ...prev,
        totalPrice: room ? nights * room.pricePerNight : "",
      }));
    }
  }, [formData.roomId, formData.checkInDate, formData.checkOutDate, rooms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.roomId) return toast.error("Please select a room");

    try {
      // Create guest first
      const guestPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: "Temp@1234", // temporary password for guest
      };

      const guestRes = await api.post("/users", guestPayload); // backend endpoint to create user
      const guestId = guestRes.data.user?._id;

      if (!guestId) return toast.error("Failed to create guest");

      // Create booking
      const bookingPayload = {
        guestId,
        roomId: formData.roomId,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        numberOfGuests: formData.numberOfGuests,
      };

      const { data } = await api.post("/bookings", bookingPayload);

      if (data.booking) {
        toast.success("Booking added successfully!");
        setFormData({
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
      } else {
        toast.error(data.message || "Failed to create booking");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while creating booking");
    }
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
                    required
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
                    {[...new Set(rooms.map((r) => r.roomType))].map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
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
                        Room {room.roomNumber} — ${room.pricePerNight}/night
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
                    min={today}
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
                    min={formData.checkInDate || today}
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
                  <Form.Label>Total Price ($)</Form.Label>
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
