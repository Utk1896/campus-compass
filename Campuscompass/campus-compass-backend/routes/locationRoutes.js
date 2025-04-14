import express from 'express';
import { addLocation, getAllLocations } from '../controllers/locationController.js';

const router = express.Router();

router.post('/', addLocation); // Handles POST /api/locations
router.get('/', getAllLocations); // Handles GET /api/locations

export default router;
