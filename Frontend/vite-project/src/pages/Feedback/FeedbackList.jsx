import React, { useEffect, useState } from "react";
import { Card, Badge, Spinner, Alert } from "react-bootstrap";
import api from "../../api/axios";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/feedback");
        if (data.status) {
          setFeedbacks(data.feedbacks);
        } else {
          setErrorMessage("Failed to fetch feedbacks.");
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setErrorMessage("Error fetching feedbacks.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const renderStars = (rating) => (
    <div className="text-warning">
      {[...Array(5)].map((_, i) => (
        <i key={i} className={`bi ${i < rating ? "bi-star-fill" : "bi-star"}`}></i>
      ))}
    </div>
  );

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h4 className="fw-semibold text-secondary mb-0">User Feedbacks</h4>
      </div>

      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="text-muted mt-2">Loading feedbacks...</p>
        </div>
      )}

      {!loading && feedbacks.length === 0 && (
        <p className="text-center text-muted">No feedbacks found.</p>
      )}

      <div className="row g-4">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="col-12 col-md-6 col-lg-4">
            <Card className="shadow-sm border-0 h-100 feedback-card">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-semibold mb-1 text-dark">{fb.guestName}</h6>
                    <p className="text-muted small mb-0">{fb.phone || "No phone number"}</p>
                  </div>
                  <Badge bg="info" className="text-capitalize px-3 py-2">
                    Room {fb.roomNumber} ({fb.roomType})
                  </Badge>
                </div>

                <p className="small text-secondary mb-2">
                  <i className="bi bi-calendar-event me-2"></i>
                  Checked in on:{" "}
                  <strong>
                    {fb.checkInDate ? new Date(fb.checkInDate).toLocaleDateString("en-GB") : "N/A"}
                  </strong>
                </p>

                <div className="mb-2">{renderStars(fb.rating)}</div>

                <Card.Text className="text-secondary small flex-grow-1">
                  <i className="bi bi-chat-quote text-primary me-2"></i>
                  {fb.comment}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <style>{`
        .feedback-card {
          border-radius: 14px;
          transition: all 0.25s ease;
        }
        .feedback-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
        }
        .badge {
          font-size: 12px;
        }
        .bi-star, .bi-star-fill {
          margin-right: 2px;
          font-size: 15px;
        }
        .bi-chat-quote {
          font-size: 16px;
        }
        @media (max-width: 576px) {
          .feedback-card {
            border-radius: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default FeedbackList;
