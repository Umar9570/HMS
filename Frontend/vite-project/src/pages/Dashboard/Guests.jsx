import React, { useState, useEffect } from "react";
import { Badge, Card, Row, Col, Button, Modal, Form } from "react-bootstrap";
import api from "../../api/axios";
import { toast } from "react-toastify";

const Guests = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(null);
  const [guestToDelete, setGuestToDelete] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  // Fetch guests
  const fetchGuests = async () => {
    try {
      const { data } = await api.get("/auth/users");
      setGuests(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch guests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ----------------- ADD GUEST -----------------
  const handleAddGuest = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, role: "guest" };
      const { data } = await api.post("/auth/register", payload);
      if (data.status) {
        toast.success("Guest added successfully");
        setShowAddModal(false);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", password: "" });
        fetchGuests();
      } else {
        toast.error(data.message || "Failed to add guest");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while adding guest");
    }
  };

  // ----------------- EDIT GUEST -----------------
  const openEditModal = (guest) => {
    setCurrentGuest(guest);
    setFormData({
      firstName: guest.firstName,
      lastName: guest.lastName,
      email: guest.email,
      phone: guest.phone,
      password: ""
    });
    setShowEditModal(true);
  };

  const handleEditGuest = async (e) => {
    e.preventDefault();
    try {
      const { _id } = currentGuest;
      const { data } = await api.put(`/auth/users/${_id}`, formData);
      if (data.status) {
        toast.success("Guest updated successfully");
        setShowEditModal(false);
        fetchGuests();
      } else {
        toast.error(data.message || "Failed to update guest");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while updating guest");
    }
  };

  // ----------------- DELETE GUEST -----------------
  const openDeleteModal = (guest) => {
    setGuestToDelete(guest);
    setShowDeleteModal(true);
  };

  const handleDeleteGuest = async () => {
    try {
      const { _id } = guestToDelete;
      const { data } = await api.delete(`/auth/users/${_id}`);
      if (data.status) {
        toast.success("Guest deleted successfully");
        setShowDeleteModal(false);
        fetchGuests();
      } else {
        toast.error(data.message || "Failed to delete guest");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while deleting guest");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading guests...</p>;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-semibold text-secondary mb-0">All Guests</h4>
        <Button onClick={() => setShowAddModal(true)} className="d-flex align-items-center">
          <i className="bi bi-person-plus me-2"></i> Add Guest
        </Button>
      </div>

      {/* Guest Cards */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {guests.map((guest) => (
          <Col key={guest._id}>
            <Card className="border-0 shadow-sm guest-card h-100">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="fw-semibold mb-0 text-dark">
                    {guest.firstName} {guest.lastName}
                  </h6>
                  <Badge bg="secondary" className="status-badge">
                    Guest
                  </Badge>
                </div>
                <p className="mb-1 text-muted small">
                  <i className="bi bi-telephone me-2"></i>
                  {guest.phone || "N/A"}
                </p>
                <p className="mb-1 text-muted small">
                  <i className="bi bi-envelope me-2"></i>
                  {guest.email || "N/A"}
                </p>
                <div className="d-flex justify-content-end mt-3">
                  <Button size="sm" variant="outline-primary" onClick={() => openEditModal(guest)}>
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button size="sm" variant="outline-danger" className="mx-1" onClick={() => openDeleteModal(guest)}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ----------------- ADD MODAL ----------------- */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Guest</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddGuest}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control name="firstName" value={formData.firstName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="lastName" value={formData.lastName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Add Guest</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* ----------------- EDIT MODAL ----------------- */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Guest</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditGuest}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control name="firstName" value={formData.firstName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="lastName" value={formData.lastName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Update Guest</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* ----------------- DELETE CONFIRM MODAL ----------------- */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          {guestToDelete?.firstName} {guestToDelete?.lastName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteGuest}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        .guest-card {
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 14px;
        }
        .guest-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
        .status-badge {
          font-size: 11px;
          padding: 4px 8px;
        }
        .btn-outline-primary, .btn-outline-danger {
          border-radius: 8px;
          padding: 4px 8px;
        }
      `}</style>
    </div>
  );
};

export default Guests;
