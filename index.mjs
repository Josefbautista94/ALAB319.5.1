import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import grades from "./routes/grades.mjs";
import grades_agg from "./routes/grades_agg.mjs";
import { connectToServer } from "./db/conn.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.use("/grades", grades);
app.use("/grades", grades_agg);

// Global error handling
app.use((err, _req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(500).send("Seems like we messed up somewhere...");
});

// Connect to DB and start server
connectToServer()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB. Server not started.");
    console.error(err);
  });
