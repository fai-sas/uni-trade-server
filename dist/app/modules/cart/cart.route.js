"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(client_1.UserRole.CUSTOMER), cart_controller_1.CartController.createCart);
router.get('/', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER), cart_controller_1.CartController.getAllCarts);
router.get('/:cartId', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER), cart_controller_1.CartController.getSingleCart);
exports.cartRoutes = router;
