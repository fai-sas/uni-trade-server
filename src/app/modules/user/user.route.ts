import express from 'express'
import { UserController } from './user.controller'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.get('/', UserController.getAllUsers)

router.get(
  '/my-profile',
  auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER),
  UserController.getMyProfile
)

router.get('/users/:userId', UserController.getSingleUser)

router.get('/vendors', UserController.getAllVendors)

router.get('/vendors/:vendorId', UserController.getSingleVendor)

export const userRoutes = router
