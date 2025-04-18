import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { fileURLToPath } from 'url';

dotenv.config();
const port = process.env.PORT || 5000;

connectDB()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => console.log(`Server running on port: ${port}`));
