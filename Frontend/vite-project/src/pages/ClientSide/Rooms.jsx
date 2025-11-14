import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Rooms = () => {
    const roomCategories = [
        {
            title: "Single Room",
            image:
                "https://images.unsplash.com/photo-1590490359854-dfba19688d70",
            desc: "A cozy and budget-friendly room ideal for solo travelers, offering comfort, privacy, and all essential amenities.",
        },
        {
            title: "Double Room",
            image:
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            desc: "Perfect for couples or friends, this spacious room features elegant interiors and modern facilities.",
        },
        {
            title: "Deluxe Room",
            image:
                "https://images.unsplash.com/photo-1560448071-5bfde27d0c49",
            desc: "A blend of luxury and comfort with premium furnishings and additional amenities for a relaxing stay.",
        },
        {
            title: "Suite",
            image:
                "https://images.unsplash.com/photo-1671213989270-8d894f12c90b",
            desc: "Experience top-tier luxury with our ultra-spacious suite, designed for guests who prefer high-end living.",
        },
    ];

    return (
        <div className="client-rooms">

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
                                <Link to={'/room-categories'} className="nav-link active fw-semibold">
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

            {/* ================= HERO BANNER ================= */}
            <section className="room-hero d-flex align-items-center text-white">
                <div className="container text-center">
                    <h1 className="fw-bold display-5">Explore Our Rooms</h1>
                    <p className="mt-3 fs-5 text-white-50">
                        Luxury, comfort, and elegance—choose the perfect stay for your needs.
                    </p>
                </div>
            </section>

            {/* ================= ROOMS SECTION ================= */}
            <section className="py-5">
                <div className="container">
                    <h2 className="fw-bold text-primary text-center mb-4">
                        Room Categories
                    </h2>
                    <p className="text-center text-secondary mb-5">
                        Each room category is designed to offer an unforgettable experience.
                    </p>

                    <div className="row g-4">
                        {roomCategories.map((room, index) => (
                            <div key={index} className="col-md-6 col-lg-3">
                                <div className="card shadow-sm border-0 h-100 room-card">
                                    <img
                                        src={room.image}
                                        className="card-img-top"
                                        alt={room.title}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="fw-bold">{room.title}</h5>
                                        <p className="text-secondary small flex-grow-1">{room.desc}</p>
                                        <a
                                            href="/client/booknow"
                                            className="btn btn-outline-primary w-100 mt-2"
                                        >
                                            Book Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

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
        .text-primary{
          color: #1099a8ff !important;
        }

        .btn-primary{
          background-color: #1099a8ff !important;
          border-color: #1099a8ff !important;
        }

        .btn-primary:hover{
          background-color: #0d7480ff !important;
        }

        .btn-outline-primary{
          color: #1099a8ff !important;
          border-color: #1099a8ff !important;
        }

        .btn-outline-primary:hover{
          background-color: #1099a8ff !important;
          color: #fff !important;
        }

        .room-card img {
          height: 200px;
          object-fit: cover;
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
        }

        .card {
          border-radius: 14px;
        }

        .room-hero {
          height: 45vh;
          background: url('https://images.unsplash.com/photo-1501117716987-c8e1ecb210d1')
            center/cover no-repeat;
          position: relative;
        }

        .room-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
        }

        .room-hero .container {
          position: relative;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .room-hero {
            height: 35vh;
          }
        }
      `}</style>
        </div>
    );
};

export default Rooms;
