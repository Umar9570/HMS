import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse, Badge } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import "bootstrap/dist/css/bootstrap.min.css";
import "simplebar-react/dist/simplebar.min.css";

const Sidebar = ({ showMenu, toggleMenu }) => {
    const location = useLocation();
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const [localShow, setLocalShow] = useState(true);
    const isVisible = showMenu !== undefined ? showMenu : localShow;
    const handleToggle = () => {
        if (toggleMenu) toggleMenu();
        else setLocalShow(!localShow);
    };

    // Dropdown states
    const [openDropdown, setOpenDropdown] = useState("");
    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? "" : menu);
    };

    return (
        <>
            <div
                className={`sidebar border-end d-flex flex-column bg-white shadow-sm ${isVisible ? "show" : "hide"
                    }`}
                style={{
                    width: isVisible ? "260px" : "0",
                    minHeight: "100vh",
                    position: isMobile ? "fixed" : "sticky",
                    top: 0,
                    left: 0,
                    zIndex: 1040,
                    overflowX: "hidden",
                    transition: "all 0.3s ease",
                }}
            >
                {/* Sidebar Header */}
                <div className="sidebar-header border-bottom p-3">
                    <div className="sidebar-brand fw-semibold text-secondary fs-5 d-flex align-items-center justify-content-between">
                        <span>LuxuryStay</span>
                        {isMobile && (
                            <button
                                className="btn btn-sm btn-light ms-2 border-0"
                                onClick={handleToggle}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Sidebar Nav */}
                <ul className="sidebar-nav list-unstyled flex-grow-1 px-2 mt-3">
                    {/* === MAIN === */}
                    <li className="nav-title text-muted text-uppercase small fw-semibold px-3 mb-2">
                        Main Navigation
                    </li>

                    <li className="nav-item mb-1">
                        <Link
                            to="/dashboard"
                            className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/dashboard"
                                    ? "active-link bg-light fw-semibold"
                                    : "text-secondary"
                                }`}
                            onClick={() => isMobile && handleToggle()}
                        >
                            <i className="bi bi-speedometer2 me-2 nav-icon"></i>
                            Dashboard
                        </Link>
                    </li>

                    <li className="nav-item mb-1">
                        <Link
                            to="/bookings"
                            className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/bookings"
                                    ? "active-link bg-light fw-semibold"
                                    : "text-secondary"
                                }`}
                            onClick={() => isMobile && handleToggle()}
                        >
                            <i className="bi bi-calendar-check me-2 nav-icon"></i>
                            Bookings
                            <Badge bg="primary" className="ms-auto">
                                NEW
                            </Badge>
                        </Link>
                    </li>

                    <li className="nav-item mb-1">
                        <Link
                            to="/guests"
                            className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/guests"
                                    ? "active-link bg-light fw-semibold"
                                    : "text-secondary"
                                }`}
                            onClick={() => isMobile && handleToggle()}
                        >
                            <i className="bi bi-people me-2 nav-icon"></i>
                            Guests
                        </Link>
                    </li>

                    {/* === STAFF MANAGEMENT === */}
                    <li className="nav-item nav-group mb-1">
                        <button
                            className="nav-link nav-group-toggle d-flex align-items-center w-100 text-start border-0 bg-transparent px-3 py-2 text-secondary"
                            onClick={() => toggleDropdown("staff")}
                            aria-expanded={openDropdown === "staff"}
                        >
                            <i className="bi bi-person-gear me-2 nav-icon"></i>
                            Staff Management
                            <i
                                className={`bi ms-auto ${openDropdown === "staff" ? "bi-chevron-up" : "bi-chevron-down"
                                    }`}
                            ></i>
                        </button>

                        <Collapse in={openDropdown === "staff"}>
                            <ul className="nav-group-items list-unstyled ps-4 mt-1">
                                <li className="nav-item mb-1">
                                    <Link
                                        to="/managers"
                                        className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/managers"
                                                ? "active-link bg-light fw-semibold"
                                                : "text-secondary"
                                            }`}
                                        onClick={() => isMobile && handleToggle()}
                                    >
                                        <i className="bi bi-person-badge me-2"></i>
                                        View Staff
                                    </Link>
                                </li>
                                <li className="nav-item mb-1">
                                    <Link
                                        to="/staff/create"
                                        className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/staff/create"
                                                ? "active-link bg-light fw-semibold"
                                                : "text-secondary"
                                            }`}
                                        onClick={() => isMobile && handleToggle()}
                                    >
                                        <i className="bi bi-person-plus me-2"></i>
                                        Create Manager
                                    </Link>
                                </li>
                                <li className="nav-item mb-1">
                                    <Link
                                        to="/staff/create"
                                        className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/staff/create"
                                                ? "active-link bg-light fw-semibold"
                                                : "text-secondary"
                                            }`}
                                        onClick={() => isMobile && handleToggle()}
                                    >
                                        <i className="bi bi-person-plus me-2"></i>
                                        Create Receptionist
                                    </Link>
                                </li>
                                <li className="nav-item mb-1">
                                    <Link
                                        to="/staff/create"
                                        className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/staff/create"
                                                ? "active-link bg-light fw-semibold"
                                                : "text-secondary"
                                            }`}
                                        onClick={() => isMobile && handleToggle()}
                                    >
                                        <i className="bi bi-person-plus me-2"></i>
                                        Create HouseKeeper
                                    </Link>
                                </li>
                            </ul>
                        </Collapse>
                    </li>

                    {/* === ROOM MANAGEMENT === */}
                    <li className="nav-item nav-group mb-1">
                        <button
                            className="nav-link nav-group-toggle d-flex align-items-center w-100 text-start border-0 bg-transparent px-3 py-2 text-secondary"
                            onClick={() => toggleDropdown("rooms")}
                            aria-expanded={openDropdown === "rooms"}
                        >
                            <i className="bi bi-building me-2 nav-icon"></i>
                            Room Management
                            <i
                                className={`bi ms-auto ${openDropdown === "rooms" ? "bi-chevron-up" : "bi-chevron-down"
                                    }`}
                            ></i>
                        </button>

                        <Collapse in={openDropdown === "rooms"}>
                            <ul className="nav-group-items list-unstyled ps-4 mt-1">
                                <li className="nav-item mb-1">
                                    <Link
                                        to="/rooms"
                                        className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/rooms"
                                                ? "active-link bg-light fw-semibold"
                                                : "text-secondary"
                                            }`}
                                        onClick={() => isMobile && handleToggle()}
                                    >
                                        <i className="bi bi-door-closed me-2"></i>
                                        All Rooms
                                    </Link>
                                </li>
                                <li className="nav-item mb-1">
                                    <Link
                                        to="/rooms/categories"
                                        className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/rooms/categories"
                                                ? "active-link bg-light fw-semibold"
                                                : "text-secondary"
                                            }`}
                                        onClick={() => isMobile && handleToggle()}
                                    >
                                        <i className="bi bi-grid me-2"></i>
                                        Room Categories
                                    </Link>
                                </li>
                            </ul>
                        </Collapse>
                    </li>

                    {/* === INVENTORY & FINANCE === */}
                    <li className="nav-item mb-1">
                        <Link
                            to="/inventory"
                            className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/inventory"
                                    ? "active-link bg-light fw-semibold"
                                    : "text-secondary"
                                }`}
                            onClick={() => isMobile && handleToggle()}
                        >
                            <i className="bi bi-box-seam me-2 nav-icon"></i>
                            Inventory
                        </Link>
                    </li>

                    <li className="nav-item mb-1">
                        <Link
                            to="/finance"
                            className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/finance"
                                    ? "active-link bg-light fw-semibold"
                                    : "text-secondary"
                                }`}
                            onClick={() => isMobile && handleToggle()}
                        >
                            <i className="bi bi-cash-stack me-2 nav-icon"></i>
                            Finance
                        </Link>
                    </li>

                    <li className="nav-item mb-1">
                        <Link
                            to="/reports"
                            className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/reports"
                                    ? "active-link bg-light fw-semibold"
                                    : "text-secondary"
                                }`}
                            onClick={() => isMobile && handleToggle()}
                        >
                            <i className="bi bi-graph-up me-2 nav-icon"></i>
                            Reports
                        </Link>
                    </li>

                    {/* === SETTINGS & SYSTEM === */}
                    <li className="nav-item nav-group mb-1">
                        <button
                            className="nav-link nav-group-toggle d-flex align-items-center w-100 text-start border-0 bg-transparent px-3 py-2 text-secondary"
                            onClick={() => toggleDropdown("settings")}
                            aria-expanded={openDropdown === "settings"}
                        >
                            <i className="bi bi-gear me-2 nav-icon"></i>
                            Settings
                            <i
                                className={`bi ms-auto ${openDropdown === "settings"
                                        ? "bi-chevron-up"
                                        : "bi-chevron-down"
                                    }`}
                            ></i>
                        </button>

                        <Collapse in={openDropdown === "settings"}>
                            <ul className="nav-group-items list-unstyled ps-4 mt-1">
                                <li className="nav-item mb-1">
                                    <Link
                                        to="/profile-settings"
                                        className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/profile-settings"
                                                ? "active-link bg-light fw-semibold"
                                                : "text-secondary"
                                            }`}
                                        onClick={() => isMobile && handleToggle()}
                                    >
                                        <i className="bi bi-person-lines-fill me-2"></i>
                                        Profile Settings
                                    </Link>
                                </li>
                                <li className="nav-item mb-1">
                                    <Link
                                        to="/system-settings"
                                        className={`nav-link d-flex align-items-center px-3 py-2 rounded ${location.pathname === "/system-settings"
                                                ? "active-link bg-light fw-semibold"
                                                : "text-secondary"
                                            }`}
                                        onClick={() => isMobile && handleToggle()}
                                    >
                                        <i className="bi bi-sliders2 me-2"></i>
                                        System Settings
                                    </Link>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                </ul>

                {/* Sidebar Footer */}
                <div className="sidebar-footer border-top p-3 d-flex justify-content-center">
                    <button
                        className="sidebar-toggler btn btn-outline-light border-0"
                        onClick={handleToggle}
                    >
                        <i
                            className={`bi ${isVisible ? "bi-chevron-left" : "bi-chevron-right"
                                } text-secondary`}
                        ></i>
                    </button>
                </div>
            </div>

            {/* Overlay for Mobile */}
            {isMobile && isVisible && (
                <div
                    className="sidebar-overlay"
                    onClick={handleToggle}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.3)",
                        zIndex: 1030,
                    }}
                />
            )}

            {/* Inline Styles */}
            <style>{`
        .nav-link {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 15px;
          font-weight: 500;
        }
        .nav-link i{
          color: #1099a8ff;
          font-size: 17px;
        }
        .nav-link:hover {
          background-color: #dde7f198 !important;
          text-decoration: none;
        }
        .active-link {
          color: #0f172a !important;
          font-weight: 600 !important;
          background-color: #f1f5f9 !important;
        }
        .nav-title {
          color: #94a3b8;
          letter-spacing: 0.5px;
        }
        .sidebar-toggler {
          border-radius: 50%;
          width: 36px;
          height: 36px;
          background-color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sidebar-toggler:hover {
          background-color: #d1d4d8ff;
        }
      `}</style>
        </>
    );
};

export default Sidebar;
