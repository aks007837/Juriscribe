import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
// import chatRoutes from "./routes/chatRoutes.js"

// configuring env
dotenv.config();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("<h1> Welcome to my app </h1>");
});
app.get("/", (req, res) => {
  res.send("<h1> Welcome to my app </h1>");
});

console.log(process.env.MONGODB_URL);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log(
        `Server has started on port http://localhost:8080`.bgCyan.bold.white
      )
    );
  } catch (error) {
    console.log(`Error in connecting MONGODB ${error}`.bgRed.white);
  }
};

startServer();
