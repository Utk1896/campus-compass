import { useState } from 'react';
import API from '../api/axios';

const AddReviewForm = ({ locationId }: { locationId: string }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await API.post('/reviews', { locationId, comment, rating }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Review submitted!');
      setComment('');
      setRating(0);
    } catch (err) {
      console.error(err);
      alert('Error submitting review');
    }
  };

  return (
    <div>
      <textarea
        placeholder="Your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating (0–5)"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default AddReviewForm;
