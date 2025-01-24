"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (err, req, res, next) => {
    const status = err.status || http_status_1.default.INTERNAL_SERVER_ERROR;
    res.status(status).json({
        success: false,
        status: status,
        message: err.message || 'Something went wrong!',
        error: err,
    });
};
exports.default = globalErrorHandler;
