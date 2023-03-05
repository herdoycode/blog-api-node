import { logger } from "../startup/logger.js";

export const error = (err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).send("Something failed.");
};
