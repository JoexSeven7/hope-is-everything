const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({
        error: 'User already exists'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });

    // Send verification email
    await sendVerificationEmail(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email to verify your account.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      },
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({
      error: 'Failed to register user',
      message: error.message
    });
  }
};

// Send verification email
async function sendVerificationEmail(user) {
  try {
    const verificationToken = generateToken(user._id);
    user.verificationToken = verificationToken;
    await user.save();

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&id=${user._id}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Verify Your Email Address',
      html: `
        <h1>Welcome to Hope Is Everything!</h1>
        <p>Please click the link below to verify your email address:</p>
        <p>
          <a href="${verificationUrl}" style="background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Verify Email Address
          </a>
        </p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't sign up for an account, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${user.email}`);
  } catch (error) {
    console.error('Email sending error:', error);
  }
}

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { token, id } = req.query;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        error: 'Email already verified'
      });
    }

    if (user.verificationToken !== token) {
      return res.status(400).json({
        error: 'Invalid verification token'
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully!'
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      error: 'Failed to verify email'
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified
        },
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({
        error: 'Invalid email or password'
      });
    }

  } catch (error) {
    console.error('User login error:', error);
    res.status(500).json({
      error: 'Failed to login'
    });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Failed to get user'
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, preferences },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Failed to update profile'
    });
  }
};

// Reset password request
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const resetToken = generateToken(user._id);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset Request</h1>
        <p>We received a request to reset your password.</p>
        <p>Please click the link below to reset your password:</p>
        <p>
          <a href="${resetUrl}" style="background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
        </p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Password reset email sent'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      error: 'Failed to send password reset email'
    });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        error: 'Invalid or expired token'
      });
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully!'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      error: 'Failed to reset password'
    });
  }
};
