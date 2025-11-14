// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import RegisterGuest from "../pages/Auth/Register";
import CreateStaff from "../pages/Dashboard/CreateStaff";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ViewStaff from "../pages/Dashboard/ViewStaff";
import Guests from "../pages/Dashboard/Guests";
import RoomList from "../pages/Rooms/RoomList";
import AddRoom from "../pages/Rooms/AddRoom";
import BookingList from "../pages/Bookings/BookingList";
import AddBooking from "../pages/Bookings/AddBooking";
import FeedbackList from "../pages/Feedback/FeedbackList";
import ComplaintList from "../pages/Complaint/ComplaintList";
import CleaningReq from "../pages/Cleaning/CleaningRequests";

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
      <Route path="view-staff" element={
          <ProtectedRoute roles={["admin", "manager"]}>
            <ViewStaff />
          </ProtectedRoute>
        } />
      <Route path="guests" element={
          <ProtectedRoute roles={["admin", "manager"]}>
            <Guests />
          </ProtectedRoute>
        } />
      <Route path="rooms" element={
          <ProtectedRoute roles={["admin", "manager"]}>
            <RoomList />
          </ProtectedRoute>
        } />
      <Route path="add-room" element={
          <ProtectedRoute roles={["admin", "manager"]}>
            <AddRoom />
          </ProtectedRoute>
        } />
      <Route path="bookings" element={
          <ProtectedRoute roles={["admin", "manager", "reciptionist"]}>
            <BookingList />
          </ProtectedRoute>
        } />
      <Route path="add-booking" element={
          <ProtectedRoute roles={["admin", "manager", "reciptionist"]}>
            <AddBooking />
          </ProtectedRoute>
        } />
      <Route path="feedbacks" element={
          <ProtectedRoute roles={["admin", "manager", "reciptionist"]}>
            <FeedbackList />
          </ProtectedRoute>
        } />
      <Route path="complaints" element={
          <ProtectedRoute roles={["admin", "manager", "reciptionist"]}>
            <ComplaintList />
          </ProtectedRoute>
        } />
      <Route path="cleaning-requests" element={
          <ProtectedRoute roles={["admin", "manager", "reciptionist", "housekeeping"]}>
            <CleaningReq />
          </ProtectedRoute>
        } />
    </Route>

    {/* Optional: Catch-All Route */}
    {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
);

export default AppRoutes;
