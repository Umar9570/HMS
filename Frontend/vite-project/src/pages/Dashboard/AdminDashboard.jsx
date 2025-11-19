import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeGuests: 0,
    monthlyRevenue: 0,
    staffOnDuty: 0,
  });

  const [revenueData, setRevenueData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1️⃣ Fetch all bookings and populate roomId
        const { data: bookingsData } = await api.get("/bookings");
        const bookings = (bookingsData || []).map((b) => ({
          ...b,
          roomNumber: b.roomId?.roomNumber || "N/A",
          totalAmount: b.totalPrice || 0,
        }));

        // 2️⃣ Fetch all complaints
        const { data: complaintsData } = await api.get("/complaints");
        const complaints = complaintsData.complaints || [];

        // 3️⃣ Fetch all cleaning requests and populate roomId
        const { data: cleaningData } = await api.get("/cleaning");
        const cleanings = (cleaningData.requests || []).map((c) => ({
          ...c,
          roomNumber: c.roomId?.roomNumber || "N/A",
        }));

        // 4️⃣ Fetch all users
        const { data: usersData } = await api.get("/auth/users");
        const users = usersData || [];
        const activeGuests = users.filter(
          (u) => u.role === "guest" && u.status === "active"
        ).length;
        const { data: staffData } = await api.get("/auth/staff");
        const staff = staffData || [];
        const staffOnDuty = staff.filter(
          (u) => u.role !== "guest" && u.status === "active"
        ).length-1;

        // 5️⃣ Compute monthly revenue (exclude canceled bookings)
        const revenueByMonth = {};
        bookings.forEach((booking) => {
          if (booking.status !== "cancelled") {
            const month = new Date(booking.checkInDate).toLocaleString("default", {
              month: "short",
            });
            revenueByMonth[month] = (revenueByMonth[month] || 0) + booking.totalAmount;
          }
        });
        const revenueChartData = Object.entries(revenueByMonth).map(
          ([month, revenue]) => ({ month, revenue })
        );

        // 6️⃣ Generate recent activity
        const recent = [
          ...bookings
            .slice(-3)
            .map((b) => `🧾 New booking created for Room ${b.roomNumber}`),
          ...complaints
            .slice(-2)
            .map(
              (c) =>
                `⚠️ Complaint submitted by ${c.userId?.firstName || c.name || "Unknown"
                }`
            ),
          ...cleanings
            .slice(-2)
            .map((c) => `🧹 Cleaning requested for Room ${c.roomNumber}`),
        ];

        // 7️⃣ Set state
        setStats({
          totalBookings: bookings.length,
          activeGuests,
          monthlyRevenue: bookings
            .filter((b) => b.status !== "cancelled")
            .reduce((sum, b) => sum + (b.totalAmount || 0), 0),
          staffOnDuty,
        });
        setRevenueData(revenueChartData);
        setRecentActivity(recent);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* === TOP STATS === */}
      <Row className="g-3 mb-4">
        {[
          { title: "Total Bookings", value: stats.totalBookings, icon: "bi-calendar-check" },
          { title: "Active Guests", value: stats.activeGuests, icon: "bi-people" },
          { title: "Monthly Revenue", value: `$${stats.monthlyRevenue.toLocaleString()}`, icon: "bi-cash-stack" },
          { title: "Staff On Duty", value: stats.staffOnDuty, icon: "bi-person-badge" },
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
                {recentActivity.length ? (
                  recentActivity.map((item, index) => (
                    <li key={index} className="list-group-item small">{item}</li>
                  ))
                ) : (
                  <li className="list-group-item small text-muted">No recent activity</li>
                )}
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
