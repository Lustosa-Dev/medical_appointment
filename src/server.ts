import express from "express";
import { userRouter } from "./routes/user.routes";

const app = express();

// middlewares
app.use(express.json());
app.use(userRouter);

app.listen(3000, () => {
  console.log("server is running at 3000!!");
});
