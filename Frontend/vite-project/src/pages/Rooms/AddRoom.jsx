import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Badge } from "react-bootstrap";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    pricePerNight: "",
    status: "available",
    amenities: [],
    description: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

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

  // Handle image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    // Preview images
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Submit form (dummy for now)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Room Data:", formData);
    alert("Room added successfully (mock)!");
  };

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h4 className="fw-semibold text-secondary mb-0">Add New Room</h4>
        <Button variant="outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>Back to Rooms
        </Button>
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
                    required
                  />
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
                  <Form.Label>Price per Night (₹)</Form.Label>
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
                        bg={
                          formData.amenities.includes(amenity)
                            ? "primary"
                            : "light"
                        }
                        text={
                          formData.amenities.includes(amenity)
                            ? "light"
                            : "dark"
                        }
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

              {/* Images */}
              <Col md={12}>
                <Form.Group controlId="images">
                  <Form.Label>Upload Images</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>

                {/* Image Previews */}
                {previewImages.length > 0 && (
                  <div className="d-flex flex-wrap gap-3 mt-3">
                    {previewImages.map((src, index) => (
                      <div
                        key={index}
                        className="image-preview border rounded"
                      >
                        <img
                          src={src}
                          alt={`Preview ${index}`}
                          className="rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}
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
        .image-preview {
          width: 100px;
          height: 100px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 768px) {
          .image-preview {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default AddRoom;
