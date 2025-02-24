import express from 'express';
import cors from 'cors';
import connectDB from "./config/db.js";
import dotEnv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import routes from "./routes/routes.js";
import cookieParser from 'cookie-parser';
import { errorHandler } from "./middlewares/errorHandler.js";

dotEnv.config();

//----------Express----------
const app = express()
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--------DB Connection--------
connectDB();

//-----Cors and Cookies for frontend
app.use(cors({
  origin: process.env.FRONTEND_URI,
  credentials: true,
}));
app.use(cookieParser());

//--------Routes-----------
app.use('/api/auth', authRoutes);
app.use(routes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});