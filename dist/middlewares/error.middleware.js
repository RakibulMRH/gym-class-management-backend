"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
exports.errorMiddleware = errorMiddleware;
