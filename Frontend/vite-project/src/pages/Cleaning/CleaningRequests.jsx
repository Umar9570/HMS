import React, { useEffect, useState } from "react";
import { Card, Button, Badge, Spinner, Alert } from "react-bootstrap";
import api from "../../api/axios";

const CleaningRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); // ID of request being updated
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch all cleaning requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/cleaning");
      if (data.status) {
        const formatted = data.requests.map((req) => ({
          _id: req._id,
          roomNumber: req.roomId?.roomNumber || "N/A",
          issue: req.issue,
          reportedBy:
            req.reportedBy
              ? `${req.reportedBy.firstName} ${req.reportedBy.lastName}`
              : "Unknown",
          status: req.status,
          createdAt: req.createdAt,
        }));
        setRequests(formatted);
      }
    } catch (error) {
      console.error("Error fetching cleaning requests:", error);
      setErrorMessage("Failed to fetch cleaning requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Update status (start or complete cleaning)
  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      const { data } = await api.put(`/cleaning/${id}/status`, { status });

      if (data.status) {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status } : r))
        );
      } else {
        setErrorMessage("Failed to update status.");
      }
    } catch (error) {
      console.error("Status update error:", error);
      setErrorMessage("Error updating cleaning request status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Badge colors
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
        <h4 className="fw-semibold text-secondary mb-0">
          Cleaning Requests
        </h4>

        <Button variant="primary" className="d-flex align-items-center" onClick={fetchRequests}>
          <i className="bi bi-arrow-clockwise me-2"></i>Refresh
        </Button>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="text-muted mt-2">Loading cleaning requests...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && requests.length === 0 && (
        <p className="text-center text-muted">No cleaning requests found.</p>
      )}

      {/* Cards Grid */}
      <div className="row g-4">
        {requests.map((req) => (
          <div key={req._id} className="col-12 col-md-6 col-lg-4">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="d-flex flex-column">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-semibold mb-1 text-dark">Room {req.roomNumber}</h6>
                    <p className="text-muted small mb-0">Reported by: {req.reportedBy}</p>
                  </div>
                  <Badge bg={getStatusBadge(req.status)} className="text-capitalize px-2 py-1">
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
                  {" at "}
                  {new Date(req.createdAt).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {/* Action Buttons */}
                <div className="mt-auto d-flex justify-content-between">
                  {req.status === "pending" && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="w-100"
                      disabled={updatingId === req._id}
                      onClick={() => updateStatus(req._id, "in-progress")}
                    >
                      {updatingId === req._id ? (
                        <Spinner size="sm" animation="border" className="me-2" />
                      ) : (
                        <i className="bi bi-play-circle me-1"></i>
                      )}
                      Start Cleaning
                    </Button>
                  )}

                  {req.status === "in-progress" && (
                    <Button
                      variant="success"
                      size="sm"
                      className="w-100"
                      disabled={updatingId === req._id}
                      onClick={() => updateStatus(req._id, "cleaned")}
                    >
                      {updatingId === req._id ? (
                        <Spinner size="sm" animation="border" className="me-2" />
                      ) : (
                        <i className="bi bi-check-circle me-1"></i>
                      )}
                      Mark Cleaned
                    </Button>
                  )}

                  {req.status === "cleaned" && (
                    <Button variant="outline-secondary" size="sm" className="w-100" disabled>
                      <i className="bi bi-check2-all me-1"></i>Completed
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Styles */}
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
      `}</style>
    </div>
  );
};

export default CleaningRequests;
