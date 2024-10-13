"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body);
    try {
        const userExists = await user_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new user_1.default({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await user_1.default.findOne({ email });
        console.log(user);
        if (!user) {
            res.status(400).json({ message: 'Invalid email' });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.loginUser = loginUser;
const getUserProfile = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.user?.id).select('-password');
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        // }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getUserProfile = getUserProfile;
