import React, { useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";

const ComplaintList = () => {
  // Dummy complaint data
  const [complaints, setComplaints] = useState([
    {
      _id: "1",
      name: "John Doe",
      role: "guest",
      phone: "+91 9876543210",
      complaintType: "Room Service",
      priority: "high",
      message: "Room service was delayed by more than an hour.",
      status: "pending",
      date: "2025-11-10",
    },
    {
      _id: "2",
      name: "Emma Wilson",
      role: "staff",
      phone: "+91 9012345678",
      complaintType: "Equipment",
      priority: "medium",
      message: "The housekeeping trolley’s wheel is broken.",
      status: "in-progress",
      date: "2025-11-09",
    },
    {
      _id: "3",
      name: "Liam Smith",
      role: "guest",
      phone: "+91 9823456789",
      complaintType: "Cleanliness",
      priority: "low",
      message: "The corridor outside Room 305 was not cleaned properly.",
      status: "resolved",
      date: "2025-11-07",
    },
    {
      _id: "4",
      name: "Sophia Brown",
      role: "staff",
      phone: "+91 9123456780",
      complaintType: "Technical Issue",
      priority: "high",
      message: "The AC unit in the reception is malfunctioning.",
      status: "pending",
      date: "2025-11-11",
    },
  ]);

  // Status badge colors
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "in-progress":
        return "info";
      case "resolved":
        return "success";
      default:
        return "secondary";
    }
  };

  // Priority badge colors
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "primary";
      case "low":
        return "secondary";
      default:
        return "light";
    }
  };

  // Mock handler to mark as resolved
  const handleResolve = (id) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, status: "resolved" } : c
      )
    );
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h4 className="fw-semibold text-secondary mb-0">All Complaints</h4>
      </div>

      {/* Complaint Cards */}
      <div className="row g-4">
        {complaints.map((c) => (
          <div key={c._id} className="col-12 col-md-6 col-lg-4">
            <Card className="shadow-sm border-0 h-100 complaint-card">
              <Card.Body className="d-flex flex-column">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-semibold mb-1 text-dark">{c.name}</h6>
                    <p className="text-muted small mb-0 text-capitalize">
                      {c.role} — {c.phone}
                    </p>
                  </div>
                  <Badge bg={getPriorityBadge(c.priority)} className="text-capitalize px-3 py-2">
                    {c.priority} Priority
                  </Badge>
                </div>

                {/* Complaint Type */}
                <p className="small text-secondary mb-2">
                  <i className="bi bi-exclamation-triangle me-2 text-danger"></i>
                  <strong>Type:</strong> {c.complaintType}
                </p>

                {/* Date */}
                <p className="small text-secondary mb-2">
                  <i className="bi bi-calendar-event me-2"></i>
                  <strong>Date:</strong>{" "}
                  {new Date(c.date).toLocaleDateString()}
                </p>

                {/* Status */}
                <div className="mb-3">
                  <Badge
                    bg={getStatusBadge(c.status)}
                    className="px-3 py-2 text-capitalize"
                  >
                    {c.status}
                  </Badge>
                </div>

                {/* Complaint Message */}
                <Card.Text className="text-secondary small flex-grow-1">
                  <i className="bi bi-chat-dots text-primary me-2"></i>
                  {c.message}
                </Card.Text>

                {/* Action Buttons */}
                <div className="mt-auto pt-2">
                  {c.status !== "resolved" ? (
                    <Button
                      variant="success"
                      size="sm"
                      className="w-100"
                      onClick={() => handleResolve(c._id)}
                    >
                      <i className="bi bi-check-circle me-1"></i>Mark as Resolved
                    </Button>
                  ) : (
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="w-100"
                      disabled
                    >
                      <i className="bi bi-patch-check me-1"></i>Resolved
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Inline Styles */}
      <style>{`
        .complaint-card {
          border-radius: 14px;
          transition: all 0.25s ease;
        }
        .complaint-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
        }
        .badge {
          font-size: 12px;
        }
        .btn {
          border-radius: 8px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 576px) {
          .complaint-card {
            border-radius: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ComplaintList;
