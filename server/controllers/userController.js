import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";

//Register User
export const registerUser = async (req, res) => {
  try {
    // 1. Extract data from request body
    const { name, email, password } = req.body;

    // 2. Validate input
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // 4. Generate salt
    const salt = await bcrypt.genSalt(10);

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Create user and save
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 7. Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // 8. Send response
    res.json({
      success: true,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//create-blog
export const createUserBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category } = JSON.parse(
      req.body.blog,
    );

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const slug = title.toLowerCase().trim().replace(/\s+/g, "-");

    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,

      slug,

      author: req.userId,

      status: "draft",

      isPublished: false,
    });

    res.json({
      success: true,
      message: "Draft created successfully",
      blog,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
