import express from 'express'
import { CartController } from './cart.controller'
import { UserRole } from '@prisma/client'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/', auth(UserRole.CUSTOMER), CartController.createCart)

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  CartController.getAllCarts
)

router.get(
  '/:cartId',
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  CartController.getSingleCart
)

export const cartRoutes = router
