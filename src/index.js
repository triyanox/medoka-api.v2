import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "process";
import { production } from "./config/production.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

// Connect to MongoDB
const MONGO_URI = env.DATABASE_URL || "mongodb://localhost/medoka";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// compression / securing the app from known vulnerabilities
if (env.NODE_ENV === "production") {
  production(app);
}

// middleware
app.use(
  cors({
    origin: env.NODE_ENV === "production" ? env.FRONTEND_URL : "*",
  })
);
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    env.NODE_ENV === "production" ? env.FRONTEND_URL : req.headers.origin
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use(routes);

// server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port", process.env.PORT || 5000);
});
