import { error } from "../middlewares/error.js";
import posts from "../routes/blogs.js";
import users from "../routes/users.js";
import categorys from "../routes/categorys.js";
import comments from "../routes/comments.js";
import messages from "../routes/messages.js";
import auth from "../routes/auth.js";

export const routes = (app) => {
  app.use("/api/posts", posts);
  app.use("/api/users", users);
  app.use("/api/categorys", categorys);
  app.use("/api/comments", comments);
  app.use("/api/messages", messages);
  app.use("/api/auth", auth);
  app.use(error);
};
