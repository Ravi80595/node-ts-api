"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/register', async (req, res) => {
    await (0, userController_1.registerUser)(req, res);
});
router.post('/login', async (req, res) => {
    await (0, userController_1.loginUser)(req, res);
});
router.get('/profile', auth_1.auth, userController_1.getUserProfile);
exports.default = router;
