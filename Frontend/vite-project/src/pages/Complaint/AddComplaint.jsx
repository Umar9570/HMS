import React, { useState, useContext } from "react";
import { Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const AddComplaint = () => {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        complaintType: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!user) return setErrorMessage("You must be logged in to submit a complaint.");

        const { complaintType, message } = formData;
        if (!complaintType || !message) return setErrorMessage("Please fill all required fields.");

        const userId = user._id || user.id;
        if (!userId) return setErrorMessage("User ID not found. Please log in again.");

        const payload = {
            userId,
            complaintType,
            message,
        };

        try {
            setLoading(true);
            const { data } = await api.post("/complaints", payload);

            if (data.status) {
                setSuccessMessage("Complaint submitted successfully!");
                setFormData({ complaintType: "", message: "" });
            } else {
                setErrorMessage(data.message || "Failed to submit complaint.");
            }
        } catch (error) {
            console.error("Error submitting complaint:", error);
            setErrorMessage(error.response?.data?.message || "Error submitting complaint.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h4 className="fw-semibold text-secondary mb-4">Add New Complaint</h4>

            {errorMessage && (
                <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
                    {errorMessage}
                </Alert>
            )}

            {successMessage && (
                <Alert variant="success" onClose={() => setSuccessMessage("")} dismissible>
                    {successMessage}
                </Alert>
            )}

            <Card className="shadow-sm border-0 p-3">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="complaintType">
                        <Form.Label>
                            Complaint Type <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="complaintType"
                            value={formData.complaintType}
                            onChange={handleChange}
                            placeholder="E.g., Room Service, Cleanliness"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="message">
                        <Form.Label>
                            Message <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Describe your complaint"
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading && <Spinner size="sm" animation="border" className="me-2" />}
                        Submit Complaint
                    </Button>
                </Form>
            </Card>

            <style>{`
        .card { border-radius: 14px; }
        .btn { border-radius: 8px; }
      `}</style>
        </div>
    );
};

export default AddComplaint;
