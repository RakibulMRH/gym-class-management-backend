"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            res.status(403).json({ success: false, message: 'Forbidden access: Insufficient permissions.' });
            return;
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
