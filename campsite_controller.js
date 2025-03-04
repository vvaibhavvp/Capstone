// import { Campsite } from "../models/Campsite_model.js"; 

// // ✅ Create a new campsite (Admin Only)
// export const createCampsite = async (req, res) => {
//     try {
//         const { campsite_name, description, address, city_id, state_id, amount, amenities, image, availability } = req.body;
//         const newCampsite = new Campsite({
//             campsite_name,
//             description,
//             address,
//             city_id,
//             state_id,
//             amount,
//             amenities,
//             image,
//             availability
//         });

//         await newCampsite.save();
//         res.status(201).json({ message: "Campsite created successfully", campsite: newCampsite });
//     } catch (error) {
//         console.error("Error:", error.message);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// // ✅ Get all campsites
// export const getAllCampsites = async (req, res) => {
//     try {
//         const campsites = await Campsite.find().populate("city_id state_id");
//         res.status(200).json(campsites);
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// // ✅ Get a single campsite by ID
// export const getCampsiteById = async (req, res) => {
//     try {
//         const campsite = await Campsite.findById(req.params.id);
//         if (!campsite) return res.status(404).json({ message: "Campsite not found" });
//         res.status(200).json(campsite);
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// // ✅ Update a campsite (Admin Only)
// export const updateCampsite = async (req, res) => {
//     try {
//         const updatedCampsite = await Campsite.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedCampsite) return res.status(404).json({ message: "Campsite not found" });
//         res.status(200).json({ message: "Campsite updated successfully", campsite: updatedCampsite });
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// // ✅ Delete a campsite (Admin Only)
// export const deleteCampsite = async (req, res) => {
//     try {
//         const deletedCampsite = await Campsite.findByIdAndDelete(req.params.id);
//         if (!deletedCampsite) return res.status(404).json({ message: "Campsite not found" });
//         res.status(200).json({ message: "Campsite deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };



