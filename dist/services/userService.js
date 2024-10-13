"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRecentUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const logRecentUsers = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = await user_1.default.find({ createdAt: { $gte: sevenDaysAgo } });
    console.log('Users registered in the last 7 days:', recentUsers);
};
exports.logRecentUsers = logRecentUsers;
