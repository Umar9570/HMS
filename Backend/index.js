const express = require('express');
const ConnectDB = require('./config/db');
const UserModel = require('./models/UserSchema');
const app = express();
const cors = require('cors');
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use('/api/auth', require('./Routes/AuthRoutes'));
app.use('/api/bookings', require('./Routes/BookingRoutes')); 
app.use('/api/rooms', require('./Routes/RoomRoutes'));
app.use('/api/housekeeping', require('./Routes/HouseKeepingRoutes'));
app.use('/api/maintenance', require('./Routes/MaintenanceRoutes'));
app.use('/api/reports', require('./Routes/ReportRoutes'));
ConnectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})


