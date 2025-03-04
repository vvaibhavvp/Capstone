import User from "../models/user_model.js"
import bcryptjs from "bcryptjs"

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get customer count
    const customerCount = await User.countDocuments()

    // For now, we'll return mock data for other stats
    // In a real application, you would query your database for these values
    const stats = {
      customerCount,
      campsiteCount: 12, // Mock data
      bookingCount: 45, // Mock data
      recentBookings: [
        // Mock data
        {
          _id: "6123456789abcdef12345678",
          user_name: "John Doe",
          campsite_name: "Pine Valley",
          checkin_date: "2023-06-15",
          booking_status: "Confirmed",
        },
        {
          _id: "6123456789abcdef12345679",
          user_name: "Jane Smith",
          campsite_name: "Mountain View",
          checkin_date: "2023-06-18",
          booking_status: "Pending",
        },
        {
          _id: "6123456789abcdef12345680",
          user_name: "Robert Johnson",
          campsite_name: "Lakeside Retreat",
          checkin_date: "2023-06-20",
          booking_status: "Confirmed",
        },
        {
          _id: "6123456789abcdef12345681",
          user_name: "Emily Davis",
          campsite_name: "Forest Haven",
          checkin_date: "2023-06-22",
          booking_status: "Cancelled",
        },
      ],
    }

    res.status(200).json(stats)
  } catch (error) {
    console.error("Error getting dashboard stats:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find().select("-password")
    res.status(200).json(customers)
  } catch (error) {
    console.error("Error getting customers:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Get a single customer
export const getCustomer = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id).select("-password")
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" })
    }
    res.status(200).json(customer)
  } catch (error) {
    console.error("Error getting customer:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Create a new customer
export const createCustomer = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" })
    }

    // Hash password
    const hashPassword = await bcryptjs.hash(password, 10)

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      role: role || "User",
    })

    await newUser.save()

    res.status(201).json({
      message: "Customer created successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    })
  } catch (error) {
    console.error("Error creating customer:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Update a customer
export const updateCustomer = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    // Find user
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "Customer not found" })
    }

    // Check if email is already in use by another user
    if (email !== user.email) {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" })
      }
    }

    // Update user fields
    user.username = username || user.username
    user.email = email || user.email
    user.role = role || user.role

    // Update password if provided
    if (password) {
      user.password = await bcryptjs.hash(password, 10)
    }

    await user.save()

    res.status(200).json({
      message: "Customer updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Error updating customer:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Delete a customer
export const deleteCustomer = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "Customer not found" })
    }

    res.status(200).json({ message: "Customer deleted successfully" })
  } catch (error) {
    console.error("Error deleting customer:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}