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
exports.ProductService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createProductIntoDb = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.vendor.findUniqueOrThrow({
            where: {
                email: user === null || user === void 0 ? void 0 : user.email,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Vendor with email ${user === null || user === void 0 ? void 0 : user.email} not found.`);
    }
    try {
        yield prisma_1.default.mainCategory.findUniqueOrThrow({
            where: {
                mainCategoryId: req.body.mainCategoryId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Main Category with ID ${req.body.mainCategoryId} not found.`);
    }
    try {
        yield prisma_1.default.subCategory.findUniqueOrThrow({
            where: {
                subCategoryId: req.body.subCategoryId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Sub Category with ID ${req.body.subCategoryId} not found.`);
    }
    try {
        yield prisma_1.default.nestedSubCategory.findUniqueOrThrow({
            where: {
                nestedSubCategoryId: req.body.nestedSubCategoryId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Nested Sub Category with ID ${req.body.nestedSubCategoryId} not found.`);
    }
    const result = yield prisma_1.default.products.create({
        data: Object.assign(Object.assign({}, req.body), { vendorEmail: user === null || user === void 0 ? void 0 : user.email }),
    });
    return result;
});
const getAllProductsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.products.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            vendor: true,
            mainCategory: true,
            subCategory: true,
            nestedSubCategory: true,
        },
    });
    if (!result.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `No Product Found!! Please Add Some Products`);
    }
    return result;
});
const getSingleProductFromDb = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.products.findUniqueOrThrow({
            where: {
                productId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Product with ID ${productId} not found.`);
    }
    const result = yield prisma_1.default.products.findMany({
        where: {
            productId,
            isDeleted: false,
        },
        include: {
            vendor: true,
            mainCategory: true,
            subCategory: true,
            nestedSubCategory: true,
            cart: true,
        },
    });
    if (!result.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Product with ID ${productId} not found.`);
    }
    return result;
});
const updateProductIntoDb = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.products.findUniqueOrThrow({
            where: {
                productId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Product with ID ${productId} not found.`);
    }
    const result = yield prisma_1.default.products.update({
        where: {
            productId,
        },
        data: payload,
    });
    return result;
});
const deleteProductFromDb = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.products.findUniqueOrThrow({
            where: {
                productId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Product with ID ${productId} not found.`);
    }
    const result = yield prisma_1.default.products.update({
        where: {
            productId,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
exports.ProductService = {
    createProductIntoDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
    updateProductIntoDb,
    deleteProductFromDb,
};
