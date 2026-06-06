import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
  incrementViews,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.patch("/views/:blogId", incrementViews);
blogRouter.post("/delete", auth, adminAuth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, adminAuth, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);

blogRouter.post("/generate", auth, generateContent);

export default blogRouter;
