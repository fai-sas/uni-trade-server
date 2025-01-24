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
exports.MainCategoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const mainCategory_service_1 = require("./mainCategory.service");
const createMainCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield mainCategory_service_1.MainCategoryService.createMainCategoryIntoDb(user, req);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Main Category Created Successfully!',
        data: result,
    });
}));
const getAllMainCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mainCategory_service_1.MainCategoryService.getAllMainCategoriesFromDb();
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'All Main Categories Retrieved Successfully!',
        data: result,
    });
}));
const getSingleMainCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mainCategoryId } = req.params;
    const result = yield mainCategory_service_1.MainCategoryService.getSingleMainCategoryFromDb(mainCategoryId);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: `Single Category With Id: ${mainCategoryId} Retrieved Successfully!`,
        data: result,
    });
}));
const updateMainCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { mainCategoryId } = req.params;
    const result = yield mainCategory_service_1.MainCategoryService.updateMainCategoryIntoDb(user, mainCategoryId, req.body);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: `Category With Id: ${mainCategoryId} Updated Successfully!`,
        data: result,
    });
}));
const deleteMainCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { mainCategoryId } = req.params;
    const result = yield mainCategory_service_1.MainCategoryService.deleteMainCategoryFromDb(user, mainCategoryId);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: `Category With Id: ${mainCategoryId} Deleted Successfully!`,
        data: result,
    });
}));
exports.MainCategoryController = {
    createMainCategory,
    getAllMainCategories,
    getSingleMainCategory,
    updateMainCategory,
    deleteMainCategory,
};
