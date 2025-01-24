"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedSubCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const nestedSubCategory_controller_1 = require("./nestedSubCategory.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-nested-sub-category', (0, auth_1.default)(client_1.UserRole.ADMIN), nestedSubCategory_controller_1.NestedSubCategoryController.createNestedSubCategory);
router.get('/', nestedSubCategory_controller_1.NestedSubCategoryController.getAllNestedSubCategories);
router.get('/:nestedSubCategoryId', nestedSubCategory_controller_1.NestedSubCategoryController.getSingleNestedSubCategory);
router.put('/:nestedSubCategoryId', (0, auth_1.default)(client_1.UserRole.ADMIN), nestedSubCategory_controller_1.NestedSubCategoryController.updateNestedSubCategory);
router.delete('/:nestedSubCategoryId', (0, auth_1.default)(client_1.UserRole.ADMIN), nestedSubCategory_controller_1.NestedSubCategoryController.deleteNestedSubCategory);
exports.nestedSubCategoryRoutes = router;
