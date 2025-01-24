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
exports.NestedSubCategoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const nestedSubCategory_service_1 = require("./nestedSubCategory.service");
const createNestedSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield nestedSubCategory_service_1.NestedSubCategoryService.createNestedSubCategoryIntoDb(user, req);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Sub Category Created Successfully!',
        data: result,
    });
}));
const getAllNestedSubCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield nestedSubCategory_service_1.NestedSubCategoryService.getAllNestedSubCategoriesFromDb();
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'All Nested Sub Categories Retrieved Successfully!',
        data: result,
    });
}));
const getSingleNestedSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nestedSubCategoryId } = req.params;
    const result = yield nestedSubCategory_service_1.NestedSubCategoryService.getSingleNestedSubCategoryFromDb(nestedSubCategoryId);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: `Single Nested Sub Category With Id: ${nestedSubCategoryId} Retrieved Successfully!`,
        data: result,
    });
}));
const updateNestedSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { nestedSubCategoryId } = req.params;
    const result = yield nestedSubCategory_service_1.NestedSubCategoryService.updateNestedSubCategoryIntoDb(user, nestedSubCategoryId, req.body);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: `Nested Sub Category With Id: ${nestedSubCategoryId} Updated Successfully!`,
        data: result,
    });
}));
const deleteNestedSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { nestedSubCategoryId } = req.params;
    const result = yield nestedSubCategory_service_1.NestedSubCategoryService.deleteNestedSubCategoryFromDb(user, nestedSubCategoryId);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: `Nested Sub Category With Id: ${nestedSubCategoryId} Deleted Successfully!`,
        data: result,
    });
}));
exports.NestedSubCategoryController = {
    createNestedSubCategory,
    getAllNestedSubCategories,
    getSingleNestedSubCategory,
    updateNestedSubCategory,
    deleteNestedSubCategory,
};
