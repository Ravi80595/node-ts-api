"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const auth = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_1.default.findById(decoded.id);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        req.user = { id: user._id.toString(), role: user.role };
        next();
    }
    catch (error) {
        console.error('Error during Auth middleware:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};
exports.auth = auth;
