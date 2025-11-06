import React from "react";
import { Badge, Card, Row, Col } from "react-bootstrap";

const Guests = () => {
  // Dummy guest data (replace with API data later)
  const guests = [
    {
      id: 1,
      name: "Rahul Khanna",
      phone: "+91 9988776655",
      email: "rahul.khanna@email.com",
      roomNo: "202",
    },
    {
      id: 2,
      name: "Simran Desai",
      phone: "+91 9876543210",
      email: "simran.desai@email.com",
      roomNo: "305",
    },
    {
      id: 3,
      name: "Karan Mehta",
      phone: "+91 9812312312",
      email: "karan.mehta@email.com",
      roomNo: null, // not booked yet
    },
    {
      id: 4,
      name: "Anjali Singh",
      phone: "+91 9944556677",
      email: "anjali.singh@email.com",
      roomNo: "110",
    },
    {
      id: 5,
      name: "Ritesh Sharma",
      phone: "+91 9090909090",
      email: "ritesh.sharma@email.com",
      roomNo: null,
    },
  ];

  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-semibold text-secondary mb-0">All Guests</h4>
        <button className="btn btn-primary d-flex align-items-center">
          <i className="bi bi-person-plus me-2"></i> Add Guest
        </button>
      </div>

      {/* Guest Cards */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {guests.map((guest) => (
          <Col key={guest.id}>
            <Card className="border-0 shadow-sm guest-card h-100">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="fw-semibold mb-0 text-dark">{guest.name}</h6>
                  {guest.roomNo ? (
                    <Badge bg="info" className="status-badge">
                      Room {guest.roomNo}
                    </Badge>
                  ) : (
                    <Badge bg="secondary" className="status-badge">
                      Not Booked
                    </Badge>
                  )}
                </div>
                <p className="mb-1 text-muted small">
                  <i className="bi bi-telephone me-2"></i>
                  {guest.phone}
                </p>
                <p className="mb-1 text-muted small">
                  <i className="bi bi-envelope me-2"></i>
                  {guest.email}
                </p>

                <div className="d-flex justify-content-end mt-3">
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Inline Styles */}
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
        .btn-outline-primary {
          border-radius: 8px;
          padding: 4px 8px;
        }
      `}</style>
    </div>
  );
};

export default Guests;
