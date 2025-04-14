import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/reviews', reviewRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log('Server running on port 5000')
    );
  })
  .catch(err => console.error(err));
