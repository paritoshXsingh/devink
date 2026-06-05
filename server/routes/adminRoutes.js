import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, adminAuth, getAllComments);
adminRouter.get("/blogs", auth, adminAuth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, adminAuth, deleteCommentById);
adminRouter.post("/approve-comment", auth, adminAuth, approveCommentById);
adminRouter.get("/dashboard", auth, adminAuth, getDashboard);

export default adminRouter;
