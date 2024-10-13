"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await user_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email already exists.' });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new user_1.default({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, role, name, email } = req.query;
        const query = {};
        if (role)
            query.role = role;
        if (name)
            query.name = new RegExp(name, 'i');
        if (email)
            query.email = new RegExp(email, 'i');
        const users = await user_1.default.find(query)
            .skip((+page - 1) * +limit)
            .limit(+limit);
        const totalUsers = await user_1.default.countDocuments(query);
        res.status(200).json({
            users,
            totalPages: Math.ceil(totalUsers / +limit),
            currentPage: +page,
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};
exports.getUsers = getUsers;
const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (req.user && req.user.id === user._id.toString()) {
            res.status(400).json({ message: 'You cannot delete yourself.' });
            return;
        }
        await user_1.default.deleteOne({ _id: user._id });
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};
exports.deleteUser = deleteUser;
