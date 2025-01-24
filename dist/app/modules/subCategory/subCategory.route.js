"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const subCategory_controller_1 = require("./subCategory.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-sub-category', (0, auth_1.default)(client_1.UserRole.ADMIN), subCategory_controller_1.SubCategoryController.createSubCategory);
router.get('/', subCategory_controller_1.SubCategoryController.getAllSubCategories);
router.get('/:subCategoryId', subCategory_controller_1.SubCategoryController.getSingleSubCategory);
router.put('/:subCategoryId', (0, auth_1.default)(client_1.UserRole.ADMIN), subCategory_controller_1.SubCategoryController.updateSubCategory);
router.delete('/:subCategoryId', (0, auth_1.default)(client_1.UserRole.ADMIN), subCategory_controller_1.SubCategoryController.deleteSubCategory);
exports.subCategoryRoutes = router;
