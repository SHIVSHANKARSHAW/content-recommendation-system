import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/connection.js";
import authRoutes from "./routes/auth.routes.js";
import contentRoutes from "./routes/content.routes.js";
import interactionRoutes from "./routes/interaction.routes.js";
import recommendationRoutes from "./routes/recommendation.routes.js";



const app = express();

configDotenv();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

connectToDatabase();

app.use("/auth", authRoutes);
app.use("/content", contentRoutes);
app.use("/interaction", interactionRoutes);
app.use("/recommendation", recommendationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});