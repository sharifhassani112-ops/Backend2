import express, { urlencoded } from "express";
import { connectedDb } from "./config/db.js";
import todoRoute from "./route/todo.route.js";
import authRoute from "./route/auth.route.js";
const app = express();

app.use(express.json());
app.use(urlencoded());
app.use("/api/auth", authRoute);

app.use("/api/todos", todoRoute);

connectedDb().then(() => {
  app.listen(5000, () => {
    console.log("server is running on localhost:5000");
  });
});
