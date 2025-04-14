import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  comment: String,
  rating: Number,
});

export default mongoose.model('Review', reviewSchema);
