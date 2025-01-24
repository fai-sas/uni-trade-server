"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const mainCategory_controller_1 = require("./mainCategory.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-main-category', (0, auth_1.default)(client_1.UserRole.ADMIN), mainCategory_controller_1.MainCategoryController.createMainCategory);
router.get('/', mainCategory_controller_1.MainCategoryController.getAllMainCategories);
router.get('/:mainCategoryId', mainCategory_controller_1.MainCategoryController.getSingleMainCategory);
router.put('/:mainCategoryId', (0, auth_1.default)(client_1.UserRole.ADMIN), mainCategory_controller_1.MainCategoryController.updateMainCategory);
router.delete('/:mainCategoryId', (0, auth_1.default)(client_1.UserRole.ADMIN), mainCategory_controller_1.MainCategoryController.deleteMainCategory);
exports.mainCategoryRoutes = router;
