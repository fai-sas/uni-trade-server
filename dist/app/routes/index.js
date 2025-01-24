"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const mainCategory_route_1 = require("../modules/mainCategory/mainCategory.route");
const subCategory_route_1 = require("../modules/subCategory/subCategory.route");
const nestedSubCategory_route_1 = require("../modules/nestedSubCategory/nestedSubCategory.route");
const user_route_1 = require("../modules/user/user.route");
const product_route_1 = require("../modules/product/product.route");
const cart_route_1 = require("../modules/cart/cart.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/main-category',
        route: mainCategory_route_1.mainCategoryRoutes,
    },
    {
        path: '/sub-category',
        route: subCategory_route_1.subCategoryRoutes,
    },
    {
        path: '/nested-sub-category',
        route: nestedSubCategory_route_1.nestedSubCategoryRoutes,
    },
    {
        path: '/products',
        route: product_route_1.productRoutes,
    },
    {
        path: '/carts',
        route: cart_route_1.cartRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
