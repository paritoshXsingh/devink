import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  createUserBlog,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", auth, getProfile);
userRouter.post("/create-blog", auth, upload.single("image"), createUserBlog);

export default userRouter;
