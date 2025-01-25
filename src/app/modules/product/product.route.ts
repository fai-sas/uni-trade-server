import express from 'express'
import { ProductController } from './product.controller'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.post(
  '/',
  auth(UserRole.ADMIN, UserRole.VENDOR),
  ProductController.createProduct
)

router.get('/', ProductController.getAllProducts)

router.get('/:productId', ProductController.getSingleProduct)

router.put('/:productId', ProductController.updateProduct)

router.delete('/:productId', ProductController.deleteProduct)

export const productRoutes = router
