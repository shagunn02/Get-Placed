import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();
connectDB(); // Connect DB immediately

const PORT = process.env.PORT || 8000;

const app = express();

const _dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'https://get-placed-9rth.onrender.com',
  credentials: true
};
app.use(cors(corsOptions));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")))


app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// export app for vercel
export default app;

