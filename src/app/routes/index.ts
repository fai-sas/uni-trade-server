import express from 'express'
import { authRoutes } from '../modules/auth/auth.route'
import { mainCategoryRoutes } from '../modules/mainCategory/mainCategory.route'
import { subCategoryRoutes } from '../modules/subCategory/subCategory.route'
import { nestedSubCategoryRoutes } from '../modules/nestedSubCategory/nestedSubCategory.route'
import { userRoutes } from '../modules/user/user.route'
import { productRoutes } from '../modules/product/product.route'
import { cartRoutes } from '../modules/cart/cart.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/main-category',
    route: mainCategoryRoutes,
  },
  {
    path: '/sub-category',
    route: subCategoryRoutes,
  },
  {
    path: '/nested-sub-category',
    route: nestedSubCategoryRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/carts',
    route: cartRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
