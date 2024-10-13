"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    console.log(`[${timestamp}] ${method} ${url}`);
    next();
};
exports.default = logger;
