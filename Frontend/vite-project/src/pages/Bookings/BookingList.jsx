import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";

const BookingList = () => {
  // Dummy booking data
  const [bookings, setBookings] = useState([
    {
      _id: "1",
      guestName: "John Doe",
      phoneNumber: "+91 9876543210",
      roomNumber: "101",
      checkInDate: "2025-11-10",
      checkOutDate: "2025-11-14",
      numberOfGuests: 2,
      totalPrice: 4800,
      status: "reserved",
      paymentStatus: "pending",
    },
    {
      _id: "2",
      guestName: "Emma Wilson",
      phoneNumber: "+91 9123456789",
      roomNumber: "203",
      checkInDate: "2025-11-09",
      checkOutDate: "2025-11-15",
      numberOfGuests: 3,
      totalPrice: 7200,
      status: "checked-in",
      paymentStatus: "paid",
    },
    {
      _id: "3",
      guestName: "Liam Smith",
      phoneNumber: "+91 9988776655",
      roomNumber: "305",
      checkInDate: "2025-11-12",
      checkOutDate: "2025-11-13",
      numberOfGuests: 1,
      totalPrice: 2000,
      status: "cancelled",
      paymentStatus: "refunded",
    },
    {
      _id: "4",
      guestName: "Sophia Brown",
      phoneNumber: "+91 9090909090",
      roomNumber: "402",
      checkInDate: "2025-11-14",
      checkOutDate: "2025-11-16",
      numberOfGuests: 2,
      totalPrice: 4000,
      status: "checked-out",
      paymentStatus: "paid",
    },
  ]);

  // Handle confirm and cancel actions (mock)
  const handleConfirm = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, status: "checked-in", paymentStatus: "paid" } : b
      )
    );
  };

  const handleCancel = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b._id === id
          ? { ...b, status: "cancelled", paymentStatus: "refunded" }
          : b
      )
    );
  };

  // Badge colors for booking status
  const getStatusBadge = (status) => {
    switch (status) {
      case "reserved":
        return "warning";
      case "checked-in":
        return "success";
      case "checked-out":
        return "secondary";
      case "cancelled":
        return "danger";
      default:
        return "light";
    }
  };

  // Badge colors for payment status
  const getPaymentBadge = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "refunded":
        return "secondary";
      default:
        return "light";
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h4 className="fw-semibold text-secondary mb-0">All Bookings</h4>
        <Button variant="primary" className="d-flex align-items-center">
          <i className="bi bi-plus-lg me-2"></i>Add New Booking
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="row g-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="col-12 col-md-6 col-lg-4">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="d-flex flex-column">
                {/* Header Info */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-semibold mb-1 text-dark">
                      {booking.guestName}
                    </h6>
                    <p className="text-muted small mb-0">
                      Room No: {booking.roomNumber}
                    </p>
                    <p className="text-muted small mb-0">
                      <i className="bi bi-telephone me-1"></i>
                      {booking.phoneNumber}
                    </p>
                  </div>
                  <Badge
                    bg={getStatusBadge(booking.status)}
                    className="text-capitalize px-2 py-1"
                  >
                    {booking.status}
                  </Badge>
                </div>

                {/* Booking Details */}
                <ul className="list-unstyled mb-3 small text-secondary">
                  <li>
                    <i className="bi bi-calendar-check me-2"></i>
                    <strong>Check-In:</strong>{" "}
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </li>
                  <li>
                    <i className="bi bi-calendar-x me-2"></i>
                    <strong>Check-Out:</strong>{" "}
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </li>
                  <li>
                    <i className="bi bi-people me-2"></i>
                    <strong>Guests:</strong> {booking.numberOfGuests}
                  </li>
                  <li>
                    <i className="bi bi-cash-stack me-2"></i>
                    <strong>Total:</strong> ₹{booking.totalPrice.toLocaleString()}
                  </li>
                </ul>

                {/* Payment Status */}
                <div className="mb-3">
                  <Badge
                    bg={getPaymentBadge(booking.paymentStatus)}
                    className="px-2 py-1 text-capitalize"
                  >
                    {booking.paymentStatus}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto d-flex justify-content-between">
                  {booking.status === "reserved" && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="w-50 me-2"
                        onClick={() => handleConfirm(booking._id)}
                      >
                        <i className="bi bi-check-circle me-1"></i>Confirm
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="w-50"
                        onClick={() => handleCancel(booking._id)}
                      >
                        <i className="bi bi-x-circle me-1"></i>Cancel
                      </Button>
                    </>
                  )}

                  {booking.status !== "reserved" && (
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="w-100"
                      disabled
                    >
                      <i className="bi bi-info-circle me-1"></i>Completed
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

export default BookingList;
