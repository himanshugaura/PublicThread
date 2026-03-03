import type { Express } from "express";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(globalErrorHandler); 


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});     