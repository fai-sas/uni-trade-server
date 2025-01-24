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
exports.NestedSubCategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createNestedSubCategoryIntoDb = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
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
    try {
        yield prisma_1.default.mainCategory.findUniqueOrThrow({
            where: {
                mainCategoryId: (_a = req.body) === null || _a === void 0 ? void 0 : _a.mainCategoryId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Main Category with ID ${(_b = req.body) === null || _b === void 0 ? void 0 : _b.mainCategoryId} Not Found.`);
    }
    try {
        yield prisma_1.default.subCategory.findUniqueOrThrow({
            where: {
                subCategoryId: (_c = req.body) === null || _c === void 0 ? void 0 : _c.subCategoryId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Sub Category with ID ${(_d = req.body) === null || _d === void 0 ? void 0 : _d.subCategoryId} Not Found.`);
    }
    const result = yield prisma_1.default.nestedSubCategory.create({
        data: req.body,
    });
    return result;
});
const getAllNestedSubCategoriesFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.nestedSubCategory.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            mainCategory: true,
            subCategory: true,
        },
    });
    if (!result.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `No Nested Sub Category Found, Please Add Nested Sub Categories`);
    }
    return result;
});
const getSingleNestedSubCategoryFromDb = (nestedSubCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const nestedSubCategory = yield prisma_1.default.nestedSubCategory.findUniqueOrThrow({
        where: { nestedSubCategoryId },
    });
    if (!nestedSubCategory) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Nested Sub Category with ID ${nestedSubCategoryId} Not Found.`);
    }
    if (nestedSubCategory.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'NestedSub Category is marked as deleted');
    }
    const result = yield prisma_1.default.nestedSubCategory.findUniqueOrThrow({
        where: {
            nestedSubCategoryId,
            isDeleted: false,
        },
        include: {
            mainCategory: true,
            subCategory: true,
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Nested Sub Category with ID ${nestedSubCategoryId} Not Found.`);
    }
    return result;
});
const updateNestedSubCategoryIntoDb = (user, nestedSubCategoryId, payload) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield prisma_1.default.nestedSubCategory.findUniqueOrThrow({
            where: {
                nestedSubCategoryId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Nested Sub Category with ID ${nestedSubCategoryId} Not Found.`);
    }
    const result = yield prisma_1.default.nestedSubCategory.update({
        where: {
            nestedSubCategoryId,
        },
        data: payload,
    });
    return result;
});
const deleteNestedSubCategoryFromDb = (user, nestedSubCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield prisma_1.default.nestedSubCategory.findUniqueOrThrow({
            where: {
                nestedSubCategoryId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Nested Sub Category with ID ${nestedSubCategoryId} Not Found.`);
    }
    const result = yield prisma_1.default.nestedSubCategory.update({
        where: {
            nestedSubCategoryId,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
exports.NestedSubCategoryService = {
    createNestedSubCategoryIntoDb,
    getAllNestedSubCategoriesFromDb,
    getSingleNestedSubCategoryFromDb,
    updateNestedSubCategoryIntoDb,
    deleteNestedSubCategoryFromDb,
};
