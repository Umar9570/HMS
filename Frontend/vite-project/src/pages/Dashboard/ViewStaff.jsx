import React, { useState, useEffect, useContext } from "react";
import { Badge, Card, Row, Col, Button, Modal, Form, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ViewStaff = () => {
  const { user: currentUser } = useContext(AuthContext); // logged-in user
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "receptionist",
  });

  // ---------------- FETCH STAFF ----------------
  const fetchStaff = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const { data } = await api.get("/auth/staff");

      // normalize staff data
      const normalizedData = data.map((u) => ({
        ...u,
        _id: u._id || u.id,
        role: u.role?.toLowerCase(),
        status: u.status?.toLowerCase(),
      }));

      // exclude guests
      let filteredStaff = normalizedData.filter((u) => u.role !== "guest");

      // filter based on logged-in user's role
      const userRole = currentUser.role?.toLowerCase();
      const userId = currentUser._id || currentUser.id;

      if (userRole === "admin") {
        filteredStaff = filteredStaff.filter((s) => s._id !== userId);
      } else if (userRole === "manager") {
        filteredStaff = filteredStaff.filter(
          (s) => s._id !== userId && s.role !== "admin"
        );
      }

      setStaffList(filteredStaff);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ----------------- EDIT STAFF -----------------
  const openEditModal = (staff) => {
    setCurrentStaff(staff);
    setFormData({
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      phone: staff.phone,
      password: "",
      role: staff.role,
    });
    setShowEditModal(true);
  };

  const handleEditStaff = async (e) => {
    e.preventDefault();
    try {
      const { _id } = currentStaff;
      const { data } = await api.put(`/auth/staff/${_id}`, formData);
      if (data.status) {
        toast.success("Staff updated successfully");
        setShowEditModal(false);
        fetchStaff();
      } else {
        toast.error(data.message || "Failed to update staff");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while updating staff");
    }
  };

  // ----------------- DELETE STAFF -----------------
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);

  const openDeleteModal = (staff) => {
    setStaffToDelete(staff);
    setShowDeleteModal(true);
  };

  const handleDeleteStaff = async () => {
    try {
      const { _id } = staffToDelete;
      const { data } = await api.delete(`/auth/users/${_id}`);
      if (data.status) {
        toast.success("Staff deleted successfully");
        setShowDeleteModal(false);
        fetchStaff();
      } else {
        toast.error(data.message || "Failed to delete staff");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while deleting staff");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading staff...</p>;

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-semibold text-secondary mb-0">All Staff Members</h4>
        <Link to={"/create-staff"} className="btn btn-primary d-flex align-items-center">
          <i className="bi bi-person-plus me-2"></i> Add Staff
        </Link>
      </div>

      {/* Staff Cards */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {staffList.map((staff) => (
          <Col key={staff._id}>
            <Card className="border-0 shadow-sm staff-card h-100">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="fw-semibold mb-0 text-dark">
                    {staff.firstName} {staff.lastName}
                  </h6>
                  <Badge
                    bg={staff.status === "active" ? "success" : "secondary"}
                    className="status-badge"
                  >
                    {staff.status}
                  </Badge>
                </div>
                <p className="mb-1 text-muted small">
                  <i className="bi bi-telephone me-2"></i>
                  {staff.phone || "N/A"}
                </p>
                <p className="mb-2 text-muted small">
                  <i className="bi bi-person-badge me-2"></i>
                  {staff.role}
                </p>
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    className="me-2"
                    onClick={() => openEditModal(staff)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => openDeleteModal(staff)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ----------------- EDIT MODAL ----------------- */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Staff</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditStaff}>
          <Modal.Body>
            <Row>
              <Form.Group className="mb-3 col-6">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3 col-6">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Temporary Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange}>
                {currentUser.role?.toLowerCase() === "admin" && (
                  <option value="manager">Manager</option>
                )}
                <option value="receptionist">Receptionist</option>
                <option value="housekeeping">Housekeeper</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Update Staff
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* ----------------- DELETE MODAL ----------------- */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {staffToDelete?.firstName} {staffToDelete?.lastName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteStaff}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Styles */}
      <style>{`
        .staff-card {
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1),
                      box-shadow 0.25s cubic-bezier(0.4,0,0.2,1);
          border-radius: 14px;
        }
        .staff-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
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

export default ViewStaff;
