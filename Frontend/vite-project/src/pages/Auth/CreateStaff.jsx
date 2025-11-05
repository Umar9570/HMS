import { useState, useContext } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const CreateStaff = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'receptionist',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !['admin', 'manager'].includes(user.role)) {
      toast.error('Unauthorized');
      return;
    }
    try {
      const { data } = await api.post('/auth/create-staff', form);
      if (data.status) toast.success(data.message);
      else toast.error(data.message);
    } catch {
      toast.error('Error creating staff');
    }
  };

  return (
    <div className="container py-5">
      <div className="col-md-6 mx-auto">
        <div className="card shadow p-4">
          <h4 className="text-center mb-3">Create Staff Account</h4>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="mb-3">
              <label>Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Role</label>
              <select
                name="role"
                className="form-select"
                value={form.role}
                onChange={handleChange}
              >
                <option value="receptionist">Receptionist</option>
                <option value="housekeeping">Housekeeping</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="btn btn-primary w-100">Create Staff</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStaff;
