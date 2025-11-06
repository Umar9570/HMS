import React from "react";
import { Badge, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ViewStaff = () => {
  // Dummy data (you’ll replace this later with API data)
  const staffList = [
    {
      id: 1,
      name: "Amit Sharma",
      phone: "+91 9876543210",
      role: "Manager",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Verma",
      phone: "+91 9823411123",
      role: "Receptionist",
      status: "Active",
    },
    {
      id: 3,
      name: "Rohan Patel",
      phone: "+91 9765123890",
      role: "Housekeeper",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Sneha Iyer",
      phone: "+91 9988776655",
      role: "Receptionist",
      status: "Active",
    },
    {
      id: 5,
      name: "Arjun Mehta",
      phone: "+91 9123456789",
      role: "Housekeeper",
      status: "Active",
    },
  ];

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-semibold text-secondary mb-0">All Staff Members</h4>
        <Link to="/create-staff" className="btn btn-primary d-flex align-items-center">
          <i className="bi bi-person-plus me-2"></i> Add Staff
        </Link>
      </div>

      {/* Staff Cards */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {staffList.map((staff) => (
          <Col key={staff.id}>
            <Card className="border-0 shadow-sm staff-card h-100">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="fw-semibold mb-0 text-dark">{staff.name}</h6>
                  <Badge
                    bg={staff.status === "Active" ? "success" : "secondary"}
                    className="status-badge"
                  >
                    {staff.status}
                  </Badge>
                </div>
                <p className="mb-1 text-muted small">
                  <i className="bi bi-telephone me-2"></i>
                  {staff.phone}
                </p>
                <p className="mb-2 text-muted small">
                  <i className="bi bi-person-badge me-2"></i>
                  {staff.role}
                </p>
                <div className="d-flex justify-content-end mt-3">
                  <button className="btn btn-sm btn-outline-primary me-2">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Styles */}
      <style>{`
        .staff-card {
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 14px;
        }
        .staff-card:hover {
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

export default ViewStaff;
