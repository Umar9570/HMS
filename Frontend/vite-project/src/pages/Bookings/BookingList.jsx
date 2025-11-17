import React, { useState, useEffect } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get("/bookings");
        setBookings(data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleConfirm = async (id) => {
    try {
      const { data } = await api.put(`/bookings/checkin/${id}`);
      if (data.booking) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id
              ? { ...b, status: "checked-in", paymentStatus: "paid" }
              : b
          )
        );
        toast.success("Guest checked in successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error during check-in");
    }
  };

  const handleCancel = async (id) => {
    try {
      const { data } = await api.put(`/bookings/cancel/${id}`);
      if (data.booking) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id
              ? { ...b, status: "cancelled", paymentStatus: "refunded" }
              : b
          )
        );
        toast.success("Booking cancelled successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error cancelling booking");
    }
  };

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

  if (loading) {
    return <p className="text-center mt-5">Loading bookings...</p>;
  }

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h4 className="fw-semibold text-secondary mb-0">All Bookings</h4>
        <Link to={"/add-booking"} className="btn btn-primary d-flex align-items-center">
          <i className="bi bi-plus-lg me-2"></i>Add New Booking
        </Link>
      </div>

      {bookings < 1 ? (
        <h5 className="text-secondary text-center mt-5 fs-small">No Bookings</h5>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => {
            // Correctly get name and phone for walk-in bookings
            const name = booking.guestId
              ? `${booking.guestId.firstName} ${booking.guestId.lastName}`
              : `${booking.guestInfo.firstName} ${booking.guestInfo.lastName}`;

            const phone = booking.guestId?.phone || booking.guestInfo.phone || "N/A";

            return (
              <div key={booking._id} className="col-12 col-md-6 col-lg-4">
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="fw-semibold mb-1 text-dark">{name}</h6>

                        <p className="text-muted small mb-0">
                          Room No:{" "}
                          {booking.roomId
                            ? booking.roomId.roomNumber
                            : booking.roomNumber}
                        </p>

                        <p className="text-muted small mb-0">
                          <i className="bi bi-telephone me-1"></i>
                          {phone}
                        </p>
                      </div>

                      <Badge
                        bg={getStatusBadge(booking.status)}
                        className="text-capitalize px-2 py-1"
                      >
                        {booking.status}
                      </Badge>
                    </div>

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
                        <strong>Total:</strong> $
                        {booking.totalPrice.toLocaleString()}
                      </li>
                    </ul>

                    <div className="mb-3">
                      <Badge
                        bg={getPaymentBadge(booking.paymentStatus)}
                        className="px-2 py-1 text-capitalize"
                      >
                        {booking.paymentStatus}
                      </Badge>
                    </div>

                    <div className="mt-auto d-flex justify-content-between">
                      {booking.status === "reserved" ? (
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
                      ) : (
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
            );
          })}
        </div>
      )}

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
