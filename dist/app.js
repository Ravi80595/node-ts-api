"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const userService_1 = require("./services/userService");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(logger_1.default);
(0, userService_1.logRecentUsers)();
app.use('/api', userRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.get("/", (req, res) => {
    res.status(200).send({ "msg": "welcome to node-ts API" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await database_1.default;
        console.log("Connected to Database");
    }
    catch (err) {
        console.log(err);
        console.log("connection failed");
    }
    console.log("Listning on Port");
});
