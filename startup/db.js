import mongoose from "mongoose";
import { logger } from "./logger.js";
export default function () {
  return mongoose
    .set("strictQuery", false)
    .connect(process.env.DB_URL)
    .then(() => logger.info("Connected to MongoDB..."))
    .catch((err) => logger.error(`Could not connected to MongoDB ${err}`));
}
