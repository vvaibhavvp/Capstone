import express from "express";
import {addState, addCity, getStates, addCategory, getCitiesByState, getCategories, addCampsite} from "../controller/admin_controller.js";
const router = express.Router();

router.post('/state', addState);
router.get('/state', getStates);

router.post('/city', addCity);
router.get('/getCitiesByState/:stateId', getCitiesByState);

router.post('/category', addCategory);
router.get('/category', getCategories);

router.post("/campsite", addCampsite);

export default router;