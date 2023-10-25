import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import articleRoutes from "./routes/articleRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     exposedHeaders: "x-auth-token",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "https://news-app-ten-lovat.vercel.app",
    methods: ["POST", "GET"],
    exposedHeaders: "x-auth-token",
    credentials: true,
  })
);

app.use("/api", articleRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(
    "mongodb+srv://admin:pass@newsapp.wcx1r8f.mongodb.net/News-App?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
