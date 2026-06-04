import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  createUserBlog,
  getMyBlogs,
  publishBlog,
  deleteBlog,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", auth, getProfile);
userRouter.post("/create-blog", auth, upload.single("image"), createUserBlog);
userRouter.get("/my-blogs", auth, getMyBlogs);
userRouter.patch("/publish-blog/:id", auth, publishBlog);
userRouter.delete("/delete-blog/:id", auth, deleteBlog);

export default userRouter;
