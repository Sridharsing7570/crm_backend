const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

exports.register = async (userData) => {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("Email already in use");
    }

    // Create new user
    const user = new User({
        ...userData,
        role: "applicant", // Default role
    });

    await user.save();
    return user;
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user);
    return { user, token };
};

exports.getCurrentUser = async (userId) => {
    return await User.findById(userId).select("-password");
};
