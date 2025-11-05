// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import RegisterGuest from "../pages/Auth/Register";
import CreateStaff from "../pages/Auth/CreateStaff";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import AdminDashboard from "../pages/Dashboard/AdminDashboard"; // ✅ import
// import other pages later (Bookings, Staff, etc.)

const AppRoutes = () => (
  <Routes>
    {/* ---------------- Public Routes ---------------- */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<RegisterGuest />} />

    {/* ---------------- Protected Dashboard Routes ---------------- */}
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      {/* ✅ Default Dashboard Page */}
      <Route index element={<AdminDashboard />} />

      {/* ✅ You can also make /dashboard explicitly available */}
      <Route path="dashboard" element={<AdminDashboard />} />

      {/* ✅ Other Protected Routes */}
      <Route
        path="create-staff"
        element={
          <ProtectedRoute roles={["admin", "manager"]}>
            <CreateStaff />
          </ProtectedRoute>
        }
      />
    </Route>

    {/* Optional: Catch-All Route */}
    {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
);

export default AppRoutes;
