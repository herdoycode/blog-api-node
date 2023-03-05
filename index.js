import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./startup/logger.js";
import db from "./startup/db.js";
import { routes } from "./startup/routes.js";
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Calling routes
routes(app);

// Calling database connections
db();

const port = process.env.PORT || 8000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
