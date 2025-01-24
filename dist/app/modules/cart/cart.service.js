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
exports.CartService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// const createCartIntoDb = async (
//   user: TAuthUser,
//   req: Request
// ): Promise<Cart> => {
//   try {
//     await prisma.customer.findUniqueOrThrow({
//       where: {
//         email: user?.email,
//       },
//     })
//   } catch (error) {
//     throw new AppError(
//       status.NOT_FOUND,
//       `Customer with email ${user?.email} not found.`
//     )
//   }
//   try {
//     await prisma.products.findUniqueOrThrow({
//       where: {
//         productId: req.body?.productId,
//       },
//     })
//   } catch (error) {
//     throw new AppError(
//       status.NOT_FOUND,
//       ` Product with ${req.body?.productId} not found.`
//     )
//   }
//   const result = await prisma.cart.create({
//     data: { ...req.body, customer: user?.email },
//   })
//   return result
// }
const createCartIntoDb = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    // Check if customer exists
    const customer = yield prisma_1.default.customer.findUnique({
        where: { email: user === null || user === void 0 ? void 0 : user.email },
    });
    if (!customer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Customer with email ${user === null || user === void 0 ? void 0 : user.email} not found.`);
    }
    // Check if product exists
    const product = yield prisma_1.default.products.findUnique({
        where: { productId },
    });
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Product with ID ${productId} not found.`);
    }
    // Check if the product is already in the cart
    const existingCartEntry = yield prisma_1.default.cart.findUnique({
        where: {
            customerEmail_productId: { customerEmail: user === null || user === void 0 ? void 0 : user.email, productId }, // Using composite key
        },
    });
    if (existingCartEntry) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Product is already in the cart.');
    }
    // Add product to cart with correct customer relation
    const result = yield prisma_1.default.cart.create({
        data: {
            customer: user === null || user === void 0 ? void 0 : user.email,
            products: {
                connect: { productId }, // Connect the existing product
            },
            customer: {
                connect: { email: user === null || user === void 0 ? void 0 : user.email }, // Connect the existing customer
            },
        },
    });
    return result;
});
const getAllCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            customer: true,
            products: true,
        },
    });
    if (!result.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `No Cart Found!! Please Add Some Products to Cart`);
    }
    return result;
});
const getSingleCartFromDb = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.cart.findUniqueOrThrow({
            where: {
                cartId,
            },
        });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Cart with ID ${cartId} not found.`);
    }
    const result = yield prisma_1.default.cart.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            customer: true,
            products: true,
        },
    });
    return result;
});
exports.CartService = {
    createCartIntoDb,
    getAllCarts,
    getSingleCartFromDb,
};
