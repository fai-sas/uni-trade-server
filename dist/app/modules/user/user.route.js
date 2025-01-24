"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/', user_controller_1.UserController.getAllUsers);
router.get('/my-profile', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.CUSTOMER), user_controller_1.UserController.getMyProfile);
router.get('/users/:userId', user_controller_1.UserController.getSingleUser);
router.get('/vendors', user_controller_1.UserController.getAllVendors);
router.get('/vendors/:vendorId', user_controller_1.UserController.getSingleVendor);
exports.userRoutes = router;
