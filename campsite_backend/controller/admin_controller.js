import User from "../models/user_model.js"
import State from "../models/State_model.js"
import City from "../models/City_model.js"
import Category from "../models/Category_model.js"
import { Campsite } from "../models/Campsite_model.js"
import bcryptjs from "bcryptjs"
import multer from 'multer';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Resolve the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


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

//State Data Handling
export const addState = async (req, res) => {
  try {
      const { state_name, country } = req.body;

      const existingState = await State.findOne({ state_name, country });
      if (existingState) {
          return res.status(400).json({ message: 'State already exists' });
      }

      const newState = new State({
          state_name,
          country,
      });

      await newState.save();

      return res.status(201).json({
          message: 'State added successfully',
          state: newState,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};

export const getStates = async (req, res) => {
  try {
      const states = await State.find({}, "state_name"); // Fetch state names
      res.status(200).json(states);
  } catch (error) {
      console.error("Error fetching states:", error);
      res.status(500).json({ message: "error" });
  }
};

export const addCity = async (req, res) => {
  try {
      const { city_name, state_id } = req.body;

      const cityExists = await State.findById(state_id);
      if (!cityExists) {
          return res.status(400).json({ message: "State not found" });
      }

      const existingCity = await City.findOne({ city_name, state_id });
      if (existingCity) {
          return res.status(400).json({ message: "City already exists in this state" });
      }

      const newCity = new City({
          city_name,
          state_id,
      });

      await newCity.save();

      return res.status(201).json({
          message: "City added successfully",
          city: newCity,
      });
  } catch (error) {
      console.error("Error adding city:", error);
      res.status(500).json({ message: "error" });
  }
};

export const getCitiesByState = async (req, res) => {
  try {
    const cities = await City.find({ state_id: req.params.stateId });
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cities' });
  }
};

// Handling Camping Category
export const addCategory = async (req, res) => {
  try {
      const { category_name, category_description } = req.body;

      const existingCategory = await Category.findOne({ category_name, category_description });
      if (existingCategory) {
          return res.status(400).json({ message: 'Category already exists' });
      }

      const newCategory = new Category({
          category_name,
          category_description,
          created_at: new Date().toISOString()
      });

      await newCategory.save();

      return res.status(201).json({
          message: 'category added successfully',
          category: newCategory,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, "category_name");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage }).array('image', 3);

export const addCampsite = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading images' });
    }

    const { campsite_name, description, address, city_id, state_id, amount, amenities, availability, category_id, tags, start_date, end_date } = req.body;
    
    let tagsArray = [];
    if (tags) {
      
      if (typeof tags === 'string') {
        tagsArray = tags.split(',').map(tag => tag.trim());
      } else if (Array.isArray(tags)) {
        tagsArray = tags;  
      }
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const imagePaths = req.files.map(file => `/images/${file.filename}`);

    try {
      const newCampsite = new Campsite({
        campsite_name,
        description,
        address,
        city_id,
        state_id,
        amount,
        amenities,
        image: imagePaths,
        availability,
        category_id,
        tags: tagsArray,
        start_date,
        end_date
      });

      await newCampsite.save();
      res.status(201).json({ message: 'Campsite added successfully', campsite: newCampsite });
    } catch (error) {
      console.error("Error adding campsite:", error);
      res.status(500).json({ message: 'Error saving campsite data' });
    }
  });
};
