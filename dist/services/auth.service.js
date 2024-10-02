"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_client_1 = require("../config/prisma.client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static register(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, fullName, role } = userDetails;
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            return prisma_client_1.prisma.user.create({
                data: { email, password: hashedPassword, fullName, role },
            });
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_client_1.prisma.user.findUnique({ where: { email } });
            if (!user)
                throw new Error('User not found');
            const validPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!validPassword)
                throw new Error('Invalid password');
            const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        });
    }
}
exports.AuthService = AuthService;
