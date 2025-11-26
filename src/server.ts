import dotenv from 'dotenv';

import app from './app';
import { connectDB } from './config/database';
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
