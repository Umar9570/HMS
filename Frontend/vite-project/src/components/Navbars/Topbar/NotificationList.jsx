// src/components/navbars/topbar/NotificationList.jsx
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const NotificationList = () => {
  const notifications = [
    { id: 1, message: "Room 203 requires maintenance." },
    { id: 2, message: "New booking confirmed by guest." },
    { id: 3, message: "Housekeeping marked Room 110 as clean." },
  ];

  return (
    <div
      className="dropdown-menu dropdown-menu-end show shadow-sm p-0 mt-2"
      style={{ minWidth: "260px", zIndex: 1000 }}
    >
      <h6 className="dropdown-header bg-light fw-semibold">Notifications</h6>
      <div className="list-group list-group-flush">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div key={n.id} className="list-group-item d-flex align-items-start">
              <FaExclamationCircle className="text-primary me-2 mt-1" />
              <small>{n.message}</small>
            </div>
          ))
        ) : (
          <div className="list-group-item text-muted text-center small py-3">
            No new notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
