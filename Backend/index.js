const express = require('express');
const ConnectDB = require('./config/db');
const UserModel = require('./models/UserSchema');
const app = express();
const cors = require('cors');
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use('/api/auth', require('./Routes/AuthRoutes'))
app.use('/api/bookings', require('./Routes/BookingRoutes')); 
app.use('/api/rooms', require('./Routes/RoomRoutes'));
app.use('/api/housekeeping', require('./Routes/HouseKeepingRoutes'));
app.use('/api/maintenance', require('./Routes/MaintenanceRoutes'));
app.use('/api/reports', require('./Routes/ReportRoutes'));

// const PORT = 3000 || 5000 || 6000;
// Fetch products from API
//   async function fetchProducts() {
//     try {
//       const response = await app.get('https://fakestoreapi.com/products/');
//       console.log(response.data);
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   }
ConnectDB();

// product = fetch('https://fakestoreapi.com/products/1')
//             .then(res=>res.json())            
//             .then(json=>console.log(json));

// let education = ["HSC", "FSC", "BSCS"];

// let users = [
//     {
//         id: 1,
//         name: "Ali",
//         education: education[0]
//     },
//     {
//         id: 2,
//         name: "Usman",
//         education: education[1]
//     },
//     {
//         id: 3,
//         name: "Shahzaib",
//         education: education[2]
//     },
//     {
//         id: 4,
//         name: "Umar",
//         education: education[0]
//     },
//     {
//         id: 5,
//         name: "Hanzala",
//         education: education[1]
//     }
// ]

// let admins = [
//     {
//         id: 1,
//         name: "Admin"
//     },
//     {
//         id: 2,
//         name: "Umar"
//     },
//     {
//         id: 3,
//         name: "Shahzaib"
//     }
// ]



// let products = [
//     {
//         id: 1,
//         title: "Men's Shoes",
//         category: "Clothing",
//         price: 4500,
//         description: "Men's black sport shoes",
//         rating: ['count', 'rate']
//     },
//     {
//         id: 2,
//         title: "Women's Shoes",
//         category: "Clothing",
//         price: 4500,
//         description: "Women's red sport shoes",
//         rating: ['count', 'rate']
//     }
// ]


app.get('/', (req, res) => {
    res.send('Hello World!');
})

// app.get('/API/users', (req, res) => {
//     res.send(users);
// })

// app.get('/API/admins', (req, res) => {
//     res.send(admins);
// })

// app.get('/products', (req, res) => {
//     res.send(products[0]);
// })



// ========Api Products========

// app.post('/API/product', async (req, res) => {
//     let newProduct = req.body
//     try {
//         let product = await ProductModel.create(newProduct)
//         res.json({
//             message: "Product Created Successfully!",
//             product
//         })
//     } catch (error) {
//         res.json({
//             message: "Failed to create Product",
//             error
//         })
//     }


// })

// app.get('/API/product', async (req, res) => {
//     let Products = res.body
//     try {
//         let product = await ProductModel.find(Products)
//         res.json({
//             message: "Products Fetched Successfully!",
//             product
//         })
//     } catch (error) {
//         res.json({
//             message: "Failed to Fetch Products",
//             error
//         })
//     }


// })
// app.get('/API/product/:id', async (req, res) => {
//     let { id } = req.params
//     try {
//         let product = await ProductModel.findById(id)
//         console.log(product)
//         res.json({
//             message: "Product Fetched Successfully!",
//             product
//         })
//     } catch (error) {
//         res.json({
//             message: "Product not found",
//             error
//         })
//     }


// })

// app.delete('/API/product/:id', async (req, res) => {
//     let { id } = req.params
//     try {
//         let product = await ProductModel.findByIdAndDelete(id)
//         if (product) {
//             res.json({
//                 message: "Product Deleted Successfully!",
//                 course
//             })
//         }
//         else {
//             res.json({
//                 message: "Product not found",

//             })
//         }
//     } catch (error) {
//         res.json({
//             message: "Product not found",
//             error
//         })

//     }


// })

// app.put('/API/product/:id', async (req, res) => {
//     let { id } = req.params
//     let updatedData = req.body
//     try {
//         let updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, {new:true})
//         if (!updatedProduct) {
//             res.json({
//                 message: "Product Not Found!",
//             })
//         }
//         else {
//             res.json({
//                 message: "Product Updated Successfully",
//                 updatedProduct
//             })
//         }
//     } catch (error) {
//         res.json({
//             message: error.message,
//         })

//     }


// })







// ========Api Courses========


// app.post('/API/course', async (req, res) => {
//     let newCourse = req.body
//     try {
//         let course = await CourseModel.create(newCourse)
//         res.json({
//             message: "Course Added Successfully!",
//             course
//         })
//     } catch (error) {
//         res.json({
//             message: "Failed to add course",
//             error
//         })
//     }


// })

// app.get('/API/course', async (req, res) => {
//     let courses = res.body
//     try {
//         let course = await CourseModel.find(courses)
//         res.json({
//             message: "Courses Fetched Successfully!",
//             course
//         })
//     } catch (error) {
//         res.json({
//             message: "Failed to Fetch Courses",
//             error
//         })
//     }


// })
// app.get('/API/course/:id', async (req, res) => {
//     let { id } = req.params
//     try {
//         let course = await CourseModel.findById(id)
//         console.log(course)
//         res.json({
//             message: "Course Fetched Successfully!",
//             course
//         })
//     } catch (error) {
//         res.json({
//             message: "Course not found",
//             error
//         })
//     }


// })

// app.delete('/API/course/:id', async (req, res) => {
//     let { id } = req.params
//     try {
//         let course = await CourseModel.findByIdAndDelete(id)
//         if (course) {
//             res.json({
//                 message: "Course Deleted Successfully!",
//                 course
//             })
//         }
//         else {
//             res.json({
//                 message: "Course not found",

//             })
//         }
//     } catch (error) {
//         res.json({
//             message: "Server Error",
//             error
//         })

//     }


// })

// app.put('/API/course/:id', async (req, res) => {
//     let { id } = req.params
//     let updatedData = req.body
//     try {
//         let updatedCourse = await CourseModel.findByIdAndUpdate(id, updatedData, {new:true})
//         if (!updatedCourse) {
//             res.json({
//                 message: "Course Not Found!",
//             })
//         }
//         else {
//             res.json({
//                 message: "Course Updated Successfully",
//                 updatedCourse
//             })
//         }
//     } catch (error) {
//         res.json({
//             message: error.message,
//         })

//     }


// })








// ========Api Rooms========




// app.post('/API/room', async (req, res) => {
//     let newRoom = req.body
//     try {
//         let room = await RoomModel.create(newRoom)
//         res.json({
//             message: "Room Added Successfully!",
//             room
//         })
//     } catch (error) {
//         res.json({
//             message: "Failed to add room",
//             error
//         })
//     }


// })

// app.get('/API/room', async (req, res) => {
//     let rooms = res.body
//     try {
//         let room = await RoomModel.find(rooms)
//         res.json({
//             message: "Rooms Fetched Successfully!",
//             room
//         })
//     } catch (error) {
//         res.json({
//             message: "Failed to Fetch Rooms",
//             error
//         })
//     }


// })
// app.get('/API/room/:id', async (req, res) => {
//     let { id } = req.params
//     try {
//         let room = await RoomModel.findById(id)
//         console.log(room)
//         res.json({
//             message: "Room Fetched Successfully!",
//             room
//         })
//     } catch (error) {
//         res.json({
//             message: "Room not found",
//             error
//         })
//     }


// })

// app.delete('/API/room/:id', async (req, res) => {
//     let { id } = req.params
//     try {
//         let room = await RoomModel.findByIdAndDelete(id)
//         if (room) {
//             res.json({
//                 message: "Room Deleted Successfully!",
//                 room
//             })
//         }
//         else {
//             res.json({
//                 message: "Room not found",

//             })
//         }
//     } catch (error) {
//         res.json({
//             message: "Server Error",
//             error
//         })

//     }


// })

// app.put('/API/room/:id', async (req, res) => {
//     let { id } = req.params
//     let updatedData = req.body
//     try {
//         let updatedRoom = await RoomModel.findByIdAndUpdate(id, updatedData, {new:true})
//         if (!updatedRoom) {
//             res.json({
//                 message: "Room Not Found!",
//             })
//         }
//         else {
//             res.json({
//                 message: "Room Updated Successfully",
//                 updatedRoom
//             })
//         }
//     } catch (error) {
//         res.json({
//             message: error.message,
//         })
//     }


// })




// ========Api Users========




// app.post('/API/users', async (req, res) => {
//     let newUser = req.body
//     try {
//         let user = await UserModel.create(newUser)
//         res.json({
//             message: "User Added Successfully!",
//             user
//         })
//     } catch (error) {
//         res.json({
//             message: "Failed to add user",
//             error
//         })
//     }


// })

// app.get('/API/users', async (req, res) => {
//     let users = res.body
//     try {
//         let user = await UserModel.find(users)
//         res.json({
//             message: "Users Fetched Successfully!",
//             user
//         })
//     } catch (error) {
//         res.json({
//             message: "Failed to Fetch Users",
//             error
//         })
//     }


// })
// app.get('/API/users/:id', async (req, res) => {
//     let { id } = req.params
//     try {
//         let user = await UserModel.findById(id)
//         console.log(user)
//         res.json({
//             message: "User Fetched Successfully!",
//             user
//         })
//     } catch (error) {
//         res.json({
//             message: "User not found",
//             error
//         })
//     }


// })

// app.delete('/API/users/:id', async (req, res) => {
//     let { id } = req.params
//     try {
//         let user = await UserModel.findByIdAndDelete(id)
//         if (user) {
//             res.json({
//                 message: "User Deleted Successfully!",
//                 user
//             })
//         }
//         else {
//             res.json({
//                 message: "User not found",

//             })
//         }
//     } catch (error) {
//         res.json({
//             message: "Server Error",
//             error
//         })

//     }


// })

// app.put('/API/users/:id', async (req, res) => {
//     let { id } = req.params
//     let updatedData = req.body
//     try {
//         let updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, {new:true})
//         if (!updatedUser) {
//             res.json({
//                 message: "User Not Found!",
//             })
//         }
//         else {
//             res.json({
//                 message: "User Updated Successfully",
//                 updatedUser
//             })
//         }
//     } catch (error) {
//         res.json({
//             message: error.message,
//         })

//     }


// })




app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})


