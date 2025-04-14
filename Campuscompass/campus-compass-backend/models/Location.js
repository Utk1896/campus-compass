import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: String,
  description: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  images: [String],
});

export default mongoose.model('Location', locationSchema);
