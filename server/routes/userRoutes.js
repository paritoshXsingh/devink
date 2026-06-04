import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", auth, getProfile);

export default userRouter;
