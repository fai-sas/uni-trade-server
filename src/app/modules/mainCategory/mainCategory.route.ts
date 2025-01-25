import express from 'express'
import { MainCategoryController } from './mainCategory.controller'
import { UserRole } from '@prisma/client'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create-main-category',
  auth(UserRole.ADMIN),
  MainCategoryController.createMainCategory
)

router.get('/', MainCategoryController.getAllMainCategories)

router.get('/:mainCategoryId', MainCategoryController.getSingleMainCategory)

router.put(
  '/:mainCategoryId',
  auth(UserRole.ADMIN),
  MainCategoryController.updateMainCategory
)

router.delete(
  '/:mainCategoryId',
  auth(UserRole.ADMIN),
  MainCategoryController.deleteMainCategory
)

export const mainCategoryRoutes = router
