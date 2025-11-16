import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../api/axios"; // your axios instance
import { toast } from "react-toastify";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    pricePerNight: "",
    status: "available",
    amenities: [],
    description: "",
  });

  const [roomNumberError, setRoomNumberError] = useState("");

  const roomTypes = ["single", "double", "suite", "deluxe"];
  const statuses = ["available", "occupied", "cleaning", "maintenance"];
  const allAmenities = [
    "Wi-Fi",
    "TV",
    "AC",
    "Mini Fridge",
    "Balcony",
    "Room Service",
    "Mini Bar",
    "Jacuzzi",
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "roomNumber") setRoomNumberError(""); // Clear error on change
  };

  // Handle amenities toggle
  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if room number already exists
      const existingRooms = await api.get("/rooms");
      const roomExists = existingRooms.data.some(
        (room) => room.roomNumber === formData.roomNumber
      );

      if (roomExists) {
        setRoomNumberError(`Room ${formData.roomNumber} already exists`);
        return;
      }

      // Add room if number is unique
      const res = await api.post("/rooms", formData);

      if (res.data.room) {
        toast.success("Room added successfully!");
        setFormData({
          roomNumber: "",
          roomType: "",
          pricePerNight: "",
          status: "available",
          amenities: [],
          description: "",
        });
        setRoomNumberError("");
      } else {
        toast.error(res.data.message || "Failed to add room");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while adding room");
    }
  };

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h4 className="fw-semibold text-secondary mb-0">Add New Room</h4>
        <Link to={"/rooms"} className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>See all Rooms
        </Link>
      </div>

      {/* Form Card */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group controlId="roomNumber">
                  <Form.Label>Room Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="roomNumber"
                    placeholder="Enter room number"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    isInvalid={!!roomNumberError}
                    required
                  />
                  {roomNumberError && (
                    <Form.Control.Feedback type="invalid">
                      {roomNumberError}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="roomType">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="pricePerNight">
                  <Form.Label>Price per Night ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="pricePerNight"
                    placeholder="Enter price"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Amenities */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Amenities</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {allAmenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        bg={formData.amenities.includes(amenity) ? "primary" : "light"}
                        text={formData.amenities.includes(amenity) ? "light" : "dark"}
                        className="py-2 px-3 selectable-badge"
                        onClick={() => handleAmenityToggle(amenity)}
                        style={{ cursor: "pointer", fontSize: "13px" }}
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </Form.Group>
              </Col>

              {/* Description */}
              <Col md={12}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Enter room description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-4 d-flex justify-content-end">
              <Button type="submit" variant="primary" className="px-4">
                <i className="bi bi-save me-2"></i>Save Room
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Inline Styles */}
      <style>{`
        .card {
          border-radius: 12px;
        }
        .selectable-badge {
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        .selectable-badge:hover {
          border-color: #0d6efd;
          background-color: #eff6ff;
          color: #0d6efd;
        }
      `}</style>
    </div>
  );
};

export default AddRoom;
