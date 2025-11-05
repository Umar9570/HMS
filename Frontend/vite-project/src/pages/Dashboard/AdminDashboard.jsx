import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  // Demo data for charts
  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 14000 },
    { month: "May", revenue: 20000 },
    { month: "Jun", revenue: 17000 },
  ];

  return (
    <div className="admin-dashboard">
      {/* === TOP STATS === */}
      <Row className="g-3 mb-4">
        {[
          { title: "Total Bookings", value: "1,245", icon: "bi-calendar-check" },
          { title: "Active Guests", value: "312", icon: "bi-people" },
          { title: "Monthly Revenue", value: "$45,230", icon: "bi-cash-stack" },
          { title: "Staff On Duty", value: "28", icon: "bi-person-badge" },
        ].map((item, index) => (
          <Col key={index} xs={12} sm={6} lg={3}>
            <Card className="stat-card shadow-sm border-0 h-100">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-muted small mb-1">{item.title}</h6>
                  <h4 className="fw-bold mb-0">{item.value}</h4>
                </div>
                <i
                  className={`bi ${item.icon} text-primary opacity-75`}
                  style={{ fontSize: "28px" }}
                ></i>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* === CHART + RECENT ACTIVITY === */}
      <Row className="g-3">
        <Col xs={12} lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-bottom fw-semibold">
              Monthly Revenue Overview
            </Card.Header>
            <Card.Body style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#1099a8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-bottom fw-semibold">
              Recent Activity
            </Card.Header>
            <Card.Body className="p-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item small">
                  🧾 New booking created for Room 305
                </li>
                <li className="list-group-item small">
                  💰 Payment of $450 received from John Doe
                </li>
                <li className="list-group-item small">
                  🧹 Housekeeping assigned to Room 210
                </li>
                <li className="list-group-item small">
                  🛎️ Manager approved refund for guest #1224
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Inline styles */}
      <style>{`
        .stat-card {
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
        }
        .stat-card i{
          color: #1099a8ff !important;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
