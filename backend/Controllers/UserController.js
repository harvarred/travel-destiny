const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

const signup = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            // Save role as well
            const newUser = await User.create({ username, password: hashedPassword, role });
            res.status(201).json({ message: "User created successfully" });
        } else {
            res.status(400).json({ message: "User already exists" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (isPasswordValid) {
                const token = jwt.sign(
                    { id: existingUser._id, role: existingUser.role },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );
                res.status(200).json({
                    token,
                    user: { username: existingUser.username, role: existingUser.role }
                });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { signup, login };