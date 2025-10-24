const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { auth } = require("../middleware/auth");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { upload, uploadResume } = require("../middleware/uploadResume");

const router = express.Router();

// Validation rules
const signupValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role").isIn(["user", "company"]).withMessage("Invalid role"),
  body("name")
    .if(body("role").equals("user"))
    .notEmpty()
    .withMessage("Name is required for users"),
  body("companyName")
    .if(body("role").equals("company"))
    .notEmpty()
    .withMessage("Company name is required for companies"),
  body("companySize")
    .if(body("role").equals("company"))
    .isIn(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"])
    .withMessage("Invalid company size"),
  body("industry")
    .if(body("role").equals("company"))
    .notEmpty()
    .withMessage("Industry is required for companies"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", signupValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role, name, companyName, companySize, industry } =
      req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Create user data based on role
    const userData = {
      email,
      password,
      role,
    };

    if (role === "user") {
      userData.profile = {
        name,
      };
    }

    const user = new User(userData);
    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/googlelogin", async (req, res) => {
  try {
    const { name, email, image } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      const userData = {
        email,
        avatar: image,
        role: "user",
        authProvider: "google", // <-- new field
      };
      userData.profile = {
        name,
      };
      const user = new User(userData);
      await user.save();
    }
    sendToken(user, 200, res);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ err: "Server error" });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(400).json({ error: "Account is deactivated" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user.getPublicProfile(),
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.get("/logout", async (req, res) => {
  try {
    // In a real app, you might want to blacklist the token
    res.cookie("token", null, {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // match login
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // match login
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put(
  "/profile",
  auth,
  upload.single("resume"),
  uploadResume,
  async (req, res) => {
    try {
      const profile = req.body.profile ? JSON.parse(req.body.profile) : null;
      const updates = {};

      if (profile) {
        updates.profile = { ...req.user.profile, ...profile };
      }

      if (req.fileUrl) {
        updates.profile = updates.profile || { ...req.user.profile };
        updates.profile.resume = req.fileUrl;
      }

      const user = await User.findByIdAndUpdate(req.user._id, updates, {
        new: true,
        runValidators: true,
      }).select("-password");

      res.status(200).json({
        message: "Profile updated successfully",
        user: user.getPublicProfile(),
      });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// @route   POST /api/auth/change-password
// @desc    Change user password
// @access  Private
router.post(
  "/change-password",
  auth,
  [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { currentPassword, newPassword } = req.body;

      // Verify current password
      const user = await User.findById(req.user._id).select("+password");
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      // Update password
      req.user.password = newPassword;
      await req.user.save();

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Password change error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.post("/forgotPassword", async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const min = Math.pow(10, 4 - 1);
  const max = Math.pow(10, 4) - 1;
  const otp = Math.floor(min + Math.random() * (max - min + 1)).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  user.otp = {
    code: hashedOtp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  };
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP for Login",
    html: `
    <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px; border:1px solid white; border-radius:8px;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
        
        <!-- Header with logo or banner 
        <div style="width:100%; text-align:center;">
          <img src="https://stordial-staging.vercel.app/stordialemail.png" alt="Entity Logo" style="max-width:100%; height:auto; display:block; margin:0 auto;" />
        </div> -->
        
        <!-- Body -->
        <div style="padding:30px;">
          <h2 style="color:#333; margin-bottom:10px;">OTP for Login</h2>
          <p style="font-size:18px">Hi <b>${user.profile.name}</b>,</p>
          <p>
            Use the following <span style="background:yellow; font-weight:bold;">One-Time Password (OTP)</span> 
            to log in to your dashboard. This OTP is valid for <b>5 minutes</b>.
          </p>
          
          <div style="text-align:center; margin:30px 0;">
            <div style="font-size:28px; letter-spacing:5px; font-weight:bold; padding:15px 25px; display:inline-block; background:#f2f2f2; border-radius:8px; border:1px solid #ddd;">
              ${otp}
            </div>
          </div>
          <p><b>Regards</b><br/><b>Stordial</b></p>
        </div>
      </div>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }

  return res.status(200).json({ success: true, message: "OTP sent to email" });
});

router.post("/verifyotp", async (req, res, next) => {
  const { email, otp } = req.body;
  let Otp = "";
  for (let i = 0; i < otp.length; i++) {
    Otp = Otp + otp[i];
  }

  const user = await User.findOne({ email });
  if (!user || !user.otp)
    return res.status(400).json({ message: "Invalid request" });

  const isMatch = await bcrypt.compare(Otp, user.otp.code);
  if (!isMatch || user.otp.expiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  return res.status(200).json({ message: "OTP verified successfully!" });
});

router.put("/resetpassword", async (req, res, next) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.password = newPassword;
  await user.save();
  return res
    .status(200)
    .json({ message: "Password has been Changed Successfully" });
});

module.exports = router;
