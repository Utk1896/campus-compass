import Location from '../models/Location.js';

export const addLocation = async (req, res) => {
  try {
    const { name, review, coordinates } = req.body;
    if (!name || !review || !coordinates) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const newLocation = new Location({ name, review, coordinates });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    console.error('Error saving location:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (err) {
    console.error('Error fetching locations:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
