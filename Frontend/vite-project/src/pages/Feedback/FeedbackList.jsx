import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap";

const FeedbackList = () => {
  // Dummy feedback data
  const [feedbacks] = useState([
    {
      _id: "1",
      guestName: "John Doe",
      phone: "+91 9876543210",
      roomNumber: "101",
      roomType: "single",
      checkInDate: "2025-11-05",
      rating: 5,
      comment: "Amazing stay! Room was super clean and staff was helpful.",
    },
    {
      _id: "2",
      guestName: "Emma Wilson",
      phone: "+91 9001234567",
      roomNumber: "203",
      roomType: "suite",
      checkInDate: "2025-10-28",
      rating: 4,
      comment: "Comfortable room, but breakfast options could be better.",
    },
    {
      _id: "3",
      guestName: "Liam Smith",
      phone: "+91 9823456789",
      roomNumber: "305",
      roomType: "deluxe",
      checkInDate: "2025-11-01",
      rating: 3,
      comment: "Average experience, room service took too long.",
    },
    {
      _id: "4",
      guestName: "Sophia Brown",
      phone: "+91 9123456780",
      roomNumber: "402",
      roomType: "double",
      checkInDate: "2025-11-10",
      rating: 5,
      comment: "Absolutely wonderful stay. Highly recommended!",
    },
  ]);

  // Function to render star rating visually
  const renderStars = (rating) => {
    return (
      <div className="text-warning">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`bi ${i < rating ? "bi-star-fill" : "bi-star"}`}
          ></i>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h4 className="fw-semibold text-secondary mb-0">User Feedbacks</h4>
      </div>

      {/* Feedback Cards */}
      <div className="row g-4">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="col-12 col-md-6 col-lg-4">
            <Card className="shadow-sm border-0 h-100 feedback-card">
              <Card.Body className="d-flex flex-column">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-semibold mb-1 text-dark">
                      {fb.guestName}
                    </h6>
                    <p className="text-muted small mb-0">
                      {fb.phone || "No phone number"}
                    </p>
                  </div>
                  <Badge bg="info" className="text-capitalize px-3 py-2">
                    Room {fb.roomNumber} ({fb.roomType})
                  </Badge>
                </div>

                {/* Check-in Date */}
                <p className="small text-secondary mb-2">
                  <i className="bi bi-calendar-event me-2"></i>
                  Checked in on:{" "}
                  <strong>
                    {new Date(fb.checkInDate).toLocaleDateString()}
                  </strong>
                </p>

                {/* Rating */}
                <div className="mb-2">{renderStars(fb.rating)}</div>

                {/* Comment */}
                <Card.Text className="text-secondary small flex-grow-1">
                  <i className="bi bi-chat-quote text-primary me-2"></i>
                  {fb.comment}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Inline Styles */}
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
