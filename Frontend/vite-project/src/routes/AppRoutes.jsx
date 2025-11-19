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
import RequestCleaning from "../pages/Cleaning/RequestCleaning";
import Index from "../pages/ClientSide/Index";
import Booknow from "../pages/ClientSide/BookNow";
import Rooms from "../pages/ClientSide/Rooms";
import About from "../pages/ClientSide/About";
import Contact from "../pages/ClientSide/Contact";
import RoomEdit from "../pages/Rooms/RoomEdit";
import AddComplaint from "../pages/Complaint/AddComplaint";

const AppRoutes = () => (
  <Routes>
    {/* ---------------- Public Routes ---------------- */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<RegisterGuest />} />
    <Route path="/" element={<Index />} />
    <Route path="/home" element={<Index />} />
    <Route path="booknow" element={<Booknow />} />
    <Route path="room-categories" element={<Rooms />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />

    {/* ---------------- Protected Dashboard Routes ---------------- */}
    <Route
      path="/"
      element={
        <ProtectedRoute roles={["admin", "manager", "receptionist", "housekeeping"]}>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >


      {/* Protected Routes */}
      <Route
        path="dashboard"
        element={
          <ProtectedRoute roles={["admin", "manager"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
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
          <ProtectedRoute roles={["admin", "manager", "receptionist"]}>
            <BookingList />
          </ProtectedRoute>
        } />
      <Route path="add-booking" element={
          <ProtectedRoute roles={["admin", "manager", "receptionist"]}>
            <AddBooking />
          </ProtectedRoute>
        } />
      <Route path="feedbacks" element={
          <ProtectedRoute roles={["admin", "manager", "receptionist"]}>
            <FeedbackList />
          </ProtectedRoute>
        } />
      <Route path="complaints" element={
          <ProtectedRoute roles={["admin", "manager", "receptionist"]}>
            <ComplaintList />
          </ProtectedRoute>
        } />
      <Route path="add-complaint" element={
          <ProtectedRoute roles={["admin", "manager", "receptionist", "housekeeping"]}>
            <AddComplaint />
          </ProtectedRoute>
        } />
      <Route path="cleaning-requests" element={
          <ProtectedRoute roles={["admin", "manager", "receptionist", "housekeeping"]}>
            <CleaningReq />
          </ProtectedRoute>
        } />
      <Route path="request-cleaning" element={
          <ProtectedRoute roles={["admin", "manager", "receptionist", "housekeeping"]}>
            <RequestCleaning />
          </ProtectedRoute>
        } />
      <Route path="rooms/edit/:id" element={
          <ProtectedRoute roles={["admin", "manager"]}>
            <RoomEdit />
          </ProtectedRoute>
        } />
    </Route>

    {/* Optional: Catch-All Route */}
    {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
);

export default AppRoutes;
