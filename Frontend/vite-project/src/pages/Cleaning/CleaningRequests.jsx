import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";

const CleaningRequests = () => {
  // Dummy data for now
  const [requests, setRequests] = useState([
    {
      _id: "1",
      roomNumber: "101",
      issue: "Guest requested cleaning after checkout.",
      reportedBy: "Emma Wilson",
      status: "pending",
      assignedTo: "John (Housekeeper)",
      createdAt: "2025-11-12T09:30:00Z",
    },
    {
      _id: "2",
      roomNumber: "203",
      issue: "Spilled food on carpet, urgent clean needed.",
      reportedBy: "Liam Smith",
      status: "in-progress",
      assignedTo: "Anna (Housekeeper)",
      createdAt: "2025-11-11T14:45:00Z",
    },
    {
      _id: "3",
      roomNumber: "305",
      issue: "Routine daily cleaning.",
      reportedBy: "System (Auto)",
      status: "cleaned",
      assignedTo: "Michael (Housekeeper)",
      createdAt: "2025-11-10T08:00:00Z",
    },
  ]);

  // Handle status updates
  const handleStart = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status: "in-progress" } : r
      )
    );
  };

  const handleComplete = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status: "cleaned" } : r
      )
    );
  };

  // Badge color mapping
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "in-progress":
        return "primary";
      case "cleaned":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h4 className="fw-semibold text-secondary mb-0">Cleaning Requests</h4>
        <Button variant="primary" className="d-flex align-items-center">
          <i className="bi bi-arrow-clockwise me-2"></i>Refresh
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="row g-4">
        {requests.map((req) => (
          <div key={req._id} className="col-12 col-md-6 col-lg-4">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="d-flex flex-column">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-semibold mb-1 text-dark">
                      Room {req.roomNumber}
                    </h6>
                    <p className="text-muted small mb-0">
                      Reported by: {req.reportedBy}
                    </p>
                  </div>
                  <Badge
                    bg={getStatusBadge(req.status)}
                    className="text-capitalize px-2 py-1"
                  >
                    {req.status}
                  </Badge>
                </div>

                {/* Issue */}
                <p className="text-secondary small mb-2">
                  <i className="bi bi-info-circle me-2"></i>
                  {req.issue}
                </p>

                {/* Created Date */}
                <p className="text-muted small mb-3">
                  <i className="bi bi-calendar-event me-2"></i>
                  Requested on:{" "}
                  {new Date(req.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                {/* Action Buttons */}
                <div className="mt-auto d-flex justify-content-between">
                  {req.status === "pending" && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="w-100"
                      onClick={() => handleStart(req._id)}
                    >
                      <i className="bi bi-play-circle me-1"></i>Start Cleaning
                    </Button>
                  )}

                  {req.status === "in-progress" && (
                    <Button
                      variant="success"
                      size="sm"
                      className="w-100"
                      onClick={() => handleComplete(req._id)}
                    >
                      <i className="bi bi-check-circle me-1"></i>Mark Cleaned
                    </Button>
                  )}

                  {req.status === "cleaned" && (
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="w-100"
                      disabled
                    >
                      <i className="bi bi-check2-all me-1"></i>Completed
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
        .card {
          border-radius: 14px;
          transition: all 0.25s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
        }
        .badge {
          font-size: 12px;
        }
        .btn {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 8px;
        }
        .btn:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 576px) {
          .card {
            border-radius: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default CleaningRequests;
