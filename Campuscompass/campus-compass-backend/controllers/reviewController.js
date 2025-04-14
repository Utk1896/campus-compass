import Review from '../models/Review.js';

export const addReview = async (req, res) => {
  const { locationId, comment, rating } = req.body;
  const userId = req.user.userId;
  const review = new Review({ userId, locationId, comment, rating });
  await review.save();
  res.status(201).json(review);
};

export const getReviews = async (req, res) => {
  const { locationId } = req.params;
  const reviews = await Review.find({ locationId }).populate('userId', 'username');
  res.json(reviews);
};
