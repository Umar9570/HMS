import React, { useEffect, useState } from "react";
import { Card, Badge, Button, Spinner, Alert } from "react-bootstrap";
import api from "../../api/axios";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch complaints from API
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/complaints");
      if (data.status) {
        setComplaints(data.complaints);
      } else {
        setErrorMessage("Failed to fetch complaints.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching complaints.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      const { data } = await api.put(`/complaints/${id}/status`, { status });
      if (data.status) {
        setComplaints((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status } : c))
        );
      } else {
        setErrorMessage("Failed to update complaint status.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error updating complaint status.");
    } finally {
      setUpdatingId(null);
    }
  };

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

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h4 className="fw-semibold text-secondary mb-0">All Complaints</h4>
        <Button variant="primary" onClick={fetchComplaints}>
          <i className="bi bi-arrow-clockwise me-2"></i>Refresh
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="text-muted mt-2">Loading complaints...</p>
        </div>
      )}

      {!loading && complaints.length === 0 && (
        <p className="text-center text-muted">No complaints found.</p>
      )}

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
                  {c.date ? new Date(c.date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  }) : "N/A"}
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

                {/* Message */}
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
                      disabled={updatingId === c._id}
                      onClick={() => updateStatus(c._id, "resolved")}
                    >
                      {updatingId === c._id ? (
                        <Spinner size="sm" animation="border" className="me-2" />
                      ) : (
                        <i className="bi bi-check-circle me-1"></i>
                      )}
                      Mark as Resolved
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
