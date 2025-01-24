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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const client_1 = require("@prisma/client");
const getAllUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        where: {
            status: 'ACTIVE',
        },
        include: {
            customer: true,
            vendor: true,
        },
    });
    return result;
});
const getSingleUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.user.findUniqueOrThrow({
            where: {
                userId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User with ID ${userId} not found.`);
    }
    const result = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            userId,
            status: 'ACTIVE',
        },
        include: {
            customer: true,
            vendor: true,
        },
    });
    return result;
});
const getAllVendorsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.vendor.findMany({
        include: {
            user: true,
            products: true,
        },
    });
    return result;
});
const getSingleVendorFromDb = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.vendor.findUniqueOrThrow({
            where: {
                vendorId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Vendor with ID ${vendorId} not found.`);
    }
    const result = yield prisma_1.default.vendor.findUniqueOrThrow({
        where: {
            vendorId,
        },
        include: {
            user: true,
            products: true,
        },
    });
    return result;
});
const getMyProfileFromDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
            status: client_1.UserStatus.ACTIVE,
        },
        select: {
            userId: true,
            email: true,
            role: true,
            status: true,
        },
    });
    let profileInfo;
    if (userInfo.role === client_1.UserRole.ADMIN) {
        profileInfo = yield prisma_1.default.user.findUnique({
            where: {
                email: userInfo.email,
            },
        });
    }
    else if (userInfo.role === client_1.UserRole.VENDOR) {
        profileInfo = yield prisma_1.default.vendor.findUnique({
            where: {
                email: userInfo.email,
            },
        });
    }
    else if (userInfo.role === client_1.UserRole.CUSTOMER) {
        profileInfo = yield prisma_1.default.customer.findUnique({
            where: {
                email: userInfo.email,
            },
            include: {
                cart: true,
            },
        });
    }
    return Object.assign(Object.assign({}, userInfo), profileInfo);
});
exports.UserService = {
    getAllUsersFromDb,
    getSingleUserFromDb,
    getAllVendorsFromDb,
    getSingleVendorFromDb,
    getMyProfileFromDb,
};
