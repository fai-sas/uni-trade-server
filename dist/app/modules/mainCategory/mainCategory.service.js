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
exports.MainCategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createMainCategoryIntoDb = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.user.findUniqueOrThrow({
            where: {
                email: user === null || user === void 0 ? void 0 : user.email,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Admin with email ${user === null || user === void 0 ? void 0 : user.email} not found.`);
    }
    const result = yield prisma_1.default.mainCategory.create({
        data: req.body,
    });
    return result;
});
const getAllMainCategoriesFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.mainCategory.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            products: true,
            subCategory: true,
            nestedSubCategory: true,
        },
    });
    if (!result.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `No Main Category Found, Please Add Main Categories`);
    }
    return result;
});
const getSingleMainCategoryFromDb = (mainCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.mainCategory.findUniqueOrThrow({
            where: { mainCategoryId },
            include: {
                subCategory: true,
                nestedSubCategory: true,
            },
        });
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Main Category with ID ${mainCategoryId} Not Found.`);
    }
});
const updateMainCategoryIntoDb = (user, mainCategoryId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.user.findUniqueOrThrow({
            where: {
                email: user === null || user === void 0 ? void 0 : user.email,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Admin with Email ${user === null || user === void 0 ? void 0 : user.email} Not Found.`);
    }
    try {
        yield prisma_1.default.mainCategory.findUniqueOrThrow({
            where: {
                mainCategoryId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Main Category with ID ${mainCategoryId} Not Found.`);
    }
    const result = yield prisma_1.default.mainCategory.update({
        where: {
            mainCategoryId,
        },
        data: payload,
    });
    return result;
});
const deleteMainCategoryFromDb = (user, mainCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.user.findUniqueOrThrow({
            where: {
                email: user === null || user === void 0 ? void 0 : user.email,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Admin with Email ${user === null || user === void 0 ? void 0 : user.email} Not Found.`);
    }
    try {
        yield prisma_1.default.mainCategory.findUniqueOrThrow({
            where: {
                mainCategoryId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Main Category with ID ${mainCategoryId} Not Found.`);
    }
    const result = yield prisma_1.default.mainCategory.update({
        where: {
            mainCategoryId,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
exports.MainCategoryService = {
    createMainCategoryIntoDb,
    getAllMainCategoriesFromDb,
    getSingleMainCategoryFromDb,
    updateMainCategoryIntoDb,
    deleteMainCategoryFromDb,
};
