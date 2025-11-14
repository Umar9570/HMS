import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Booknow = () => {
    // Dummy rooms data
    const [rooms] = useState([
        { _id: "1", roomNumber: "101", roomType: "single", pricePerNight: 2000, status: "available" },
        { _id: "2", roomNumber: "102", roomType: "single", pricePerNight: 2100, status: "occupied" },
        { _id: "3", roomNumber: "203", roomType: "double", pricePerNight: 3000, status: "available" },
        { _id: "4", roomNumber: "305", roomType: "suite", pricePerNight: 5000, status: "available" },
        { _id: "5", roomNumber: "402", roomType: "deluxe", pricePerNight: 4500, status: "maintenance" },
    ]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        roomType: "",
        roomId: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfGuests: 1,
        totalPrice: "",
    });

    const [availableRooms, setAvailableRooms] = useState([]);

    // Update available rooms based on selected type
    useEffect(() => {
        if (formData.roomType) {
            const filtered = rooms.filter(
                (r) => r.roomType === formData.roomType && r.status === "available"
            );
            setAvailableRooms(filtered);
        } else {
            setAvailableRooms([]);
        }
    }, [formData.roomType]);

    // Calculate total price based on dates
    useEffect(() => {
        if (formData.checkInDate && formData.checkOutDate && formData.roomId) {
            const selectedRoom = rooms.find((r) => r._id === formData.roomId);
            const checkIn = new Date(formData.checkInDate);
            const checkOut = new Date(formData.checkOutDate);
            const nights = Math.max(
                1,
                Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
            );
            setFormData((prev) => ({
                ...prev,
                totalPrice: selectedRoom ? nights * selectedRoom.pricePerNight : "",
            }));
        }
    }, [formData.checkInDate, formData.checkOutDate, formData.roomId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Booking Submitted:", formData);
        alert("Your booking has been submitted!");
    };

    return (
        <div className="client-booking">

            {/* ================= NAVBAR ================= */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
                <div className="container">
                    <a className="navbar-brand fw-bold text-primary fs-4" href="#">
                        <i className="bi bi-building me-2"></i>RoyalStay Hotel
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#clientNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="clientNavbar">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-4">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link fw-semibold">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/room-categories'} className="nav-link fw-semibold">
                                    Rooms
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/about'} className="nav-link fw-semibold">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/contact'} className="nav-link fw-semibold">
                                    Contact Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link fw-semibold">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/booknow'} className="btn btn-primary px-3 fw-semibold">
                                    Book Now
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* ================= BOOKING FORM HEADER ================= */}
            <section className="py-5 bg-light text-center">
                <div className="container">
                    <h1 className="fw-bold text-primary">Book Your Stay</h1>
                    <p className="text-secondary mt-2">
                        Fill out the form below to reserve your perfect room at RoyalStay.
                    </p>
                </div>
            </section>

            {/* ================= BOOKING FORM ================= */}
            <div className="container my-5">
                <div className="card shadow-sm border-0 p-4">
                    <h4 className="fw-bold text-secondary mb-4">Guest Information</h4>

                    <form onSubmit={handleSubmit}>
                        {/* GUEST INFORMATION */}
                        <div className="row mb-4">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* ROOM SELECTION */}
                        <h4 className="fw-bold text-secondary mb-3">Room Selection</h4>
                        <div className="row mb-4">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Room Type</label>
                                <select
                                    className="form-select"
                                    name="roomType"
                                    value={formData.roomType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select room type</option>
                                    <option value="single">Single</option>
                                    <option value="double">Double</option>
                                    <option value="suite">Suite</option>
                                    <option value="deluxe">Deluxe</option>
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Available Rooms</label>
                                <select
                                    className="form-select"
                                    name="roomId"
                                    value={formData.roomId}
                                    onChange={handleChange}
                                    disabled={!availableRooms.length}
                                    required
                                >
                                    <option value="">
                                        {availableRooms.length ? "Select Room" : "No rooms available"}
                                    </option>
                                    {availableRooms.map((room) => (
                                        <option key={room._id} value={room._id}>
                                            Room {room.roomNumber} — ₹{room.pricePerNight}/night
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* BOOKING DETAILS */}
                        <h4 className="fw-bold text-secondary mb-3">Booking Details</h4>
                        <div className="row mb-4">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Check-In Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="checkInDate"
                                    value={formData.checkInDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Check-Out Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="checkOutDate"
                                    value={formData.checkOutDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Number of Guests</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="numberOfGuests"
                                    min="1"
                                    value={formData.numberOfGuests}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Total Price (₹)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.totalPrice}
                                    readOnly
                                    placeholder="Auto calculated"
                                />
                            </div>
                        </div>

                        <div className="text-end">
                            <button type="submit" className="btn btn-success px-4 fw-semibold">
                                <i className="bi bi-check2-circle me-2"></i>Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* ================= FOOTER ================= */}
            <footer className="bg-dark text-white py-4 mt-5">
                <div className="container text-center">
                    <h5 className="fw-bold mb-3">RoyalStay Hotel</h5>
                    <p className="mb-1">123 Luxury Street, New Delhi, India</p>
                    <p className="mb-1">Phone: +91 98765 43210</p>
                    <p>Email: contact@royalstay.com</p>
                    <p className="mt-3 small text-white-50">
                        © {new Date().getFullYear()} RoyalStay Hotel. All rights reserved.
                    </p>
                </div>
            </footer>

            {/* ================= INTERNAL CSS ================= */}
            <style>{`
        .text-primary {
          color: #1099a8ff !important;
        }

        .btn-primary, .btn-success {
          border-radius: 8px;
        }

        .btn-primary {
          background-color: #1099a8ff !important;
          border-color: #1099a8ff !important;
        }

        .btn-primary:hover {
          background-color: #0d7480ff !important;
        }

        .btn-success:hover {
          opacity: 0.9;
        }

        .form-control, .form-select {
          border-radius: 8px;
        }

        .card {
          border-radius: 14px;
        }
      `}</style>
        </div>
    );
};

export default Booknow;
