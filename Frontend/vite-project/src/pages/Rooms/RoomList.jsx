import React from "react";
import { Table, Badge, Button } from "react-bootstrap";

const RoomList = () => {
  // Dummy room data
  const rooms = [
    {
      _id: "1",
      roomNumber: "101",
      roomType: "single",
      pricePerNight: 1200,
      status: "available",
      amenities: ["Wi-Fi", "TV", "AC"],
      description: "Cozy single room with city view",
    },
    {
      _id: "2",
      roomNumber: "102",
      roomType: "double",
      pricePerNight: 2000,
      status: "occupied",
      amenities: ["Wi-Fi", "TV", "Mini Fridge", "Balcony"],
      description: "Spacious double room with balcony access",
    },
    {
      _id: "3",
      roomNumber: "201",
      roomType: "suite",
      pricePerNight: 3500,
      status: "cleaning",
      amenities: ["Wi-Fi", "TV", "Mini Bar", "Jacuzzi"],
      description: "Luxury suite with premium amenities",
    },
    {
      _id: "4",
      roomNumber: "202",
      roomType: "deluxe",
      pricePerNight: 2800,
      status: "maintenance",
      amenities: ["Wi-Fi", "TV", "AC", "Room Service"],
      description: "Deluxe room undergoing maintenance",
    },
    {_id: "5",
    roomNumber: "101",
    roomType: "single",
    pricePerNight: 1200,
    status: "available",
    amenities: ["Wi-Fi", "TV", "AC"],
    description: "Cozy single room with city view",
    },
    {
      _id: "6",
      roomNumber: "102",
      roomType: "double",
      pricePerNight: 2000,
      status: "occupied",
      amenities: ["Wi-Fi", "TV", "Mini Fridge", "Balcony"],
      description: "Spacious double room with balcony access",
    },
    {
      _id: "7",
      roomNumber: "201",
      roomType: "suite",
      pricePerNight: 3500,
      status: "cleaning",
      amenities: ["Wi-Fi", "TV", "Mini Bar", "Jacuzzi"],
      description: "Luxury suite with premium amenities",
    },
    {
        _id: "8",
      roomNumber: "202",
      roomType: "deluxe",
      pricePerNight: 2800,
      status: "maintenance",
      amenities: ["Wi-Fi", "TV", "AC", "Room Service"],
      description: "Deluxe room undergoing maintenance",
    },
    {
      _id: "9",
      roomNumber: "101",
      roomType: "single",
      pricePerNight: 1200,
      status: "available",
      amenities: ["Wi-Fi", "TV", "AC"],
      description: "Cozy single room with city view",
    },
    {
      _id: "10",
      roomNumber: "102",
      roomType: "double",
      pricePerNight: 2000,
      status: "occupied",
      amenities: ["Wi-Fi", "TV", "Mini Fridge", "Balcony"],
      description: "Spacious double room with balcony access",
    },
    {
      _id: "11",
      roomNumber: "201",
      roomType: "suite",
      pricePerNight: 3500,
      status: "cleaning",
      amenities: ["Wi-Fi", "TV", "Mini Bar", "Jacuzzi"],
      description: "Luxury suite with premium amenities",
    },
    {
      _id: "12",
      roomNumber: "202",
      roomType: "deluxe",
      pricePerNight: 2800,
      status: "maintenance",
      amenities: ["Wi-Fi", "TV", "AC", "Room Service"],
      description: "Deluxe room undergoing maintenance",
    },
    
  ];

  // Badge color based on room status
  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return "success";
      case "occupied":
        return "danger";
      case "cleaning":
        return "warning";
      case "maintenance":
        return "secondary";
      default:
        return "light";
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <h4 className="fw-semibold text-secondary mb-0">All Rooms</h4>
        <Button variant="primary" className="d-flex align-items-center">
          <i className="bi bi-plus-lg me-2"></i>Add New Room
        </Button>
      </div>

      {/* Table Wrapper */}
      <div className="table-responsive shadow-sm rounded bg-white">
        <Table hover className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Room No</th>
              <th>Type</th>
              <th>Price / Night</th>
              <th>Status</th>
              <th>Amenities</th>
              <th>Description</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room._id}>
                <td>{index + 1}</td>
                <td className="fw-semibold">{room.roomNumber}</td>
                <td className="text-capitalize">{room.roomType}</td>
                <td>₹{room.pricePerNight.toLocaleString()}</td>
                <td>
                  <Badge bg={getStatusBadge(room.status)} className="px-2 py-1 text-capitalize">
                    {room.status}
                  </Badge>
                </td>
                <td>
                  {room.amenities && room.amenities.length > 0 ? (
                    room.amenities.slice(0, 3).join(", ") +
                    (room.amenities.length > 7 ? "..." : "")
                  ) : (
                    <span className="text-muted small">None</span>
                  )}
                </td>
                <td>
                  {room.description || "-"}
                </td>
                <td className="text-end">
                  <Button variant="outline-primary" size="sm" className="me-2">
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="outline-danger" size="sm">
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Inline Styles */}
      <style>{`
        .table th {
          font-size: 14px;
          text-transform: uppercase;
          color: #64748b;
          letter-spacing: 0.3px;
        }
        .table td {
          font-size: 13px;
          vertical-align: middle;
        }
        .table-responsive {
          border-radius: 10px;
          overflow: hidden;
        }
        .btn-outline-primary, .btn-outline-danger {
          border-radius: 6px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-outline-primary:hover, .btn-outline-danger:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .table thead {
            display: none;
          }
          .table tbody tr {
            display: block;
            margin-bottom: 1rem;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 10px;
          }
          .table td {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            border-bottom: 1px dashed #f1f5f9;
          }
          .table td:last-child {
            border-bottom: none;
          }
          .table td::before {
            content: attr(data-label);
            font-weight: 600;
            color: #64748b;
          }
        }
      `}</style>
    </div>
  );
};

export default RoomList;
