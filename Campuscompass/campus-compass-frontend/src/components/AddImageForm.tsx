import { useState } from 'react';
import API from '../api/axios';

const AddImageForm = ({ locationId }: { locationId: string }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    try {
      await API.post(`/locations/${locationId}/images`, { imageUrl });
      alert('Image added!');
      setImageUrl('');
    } catch (err) {
      console.error(err);
      alert('Failed to add image');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Image</button>
    </div>
  );
};

export default AddImageForm;
