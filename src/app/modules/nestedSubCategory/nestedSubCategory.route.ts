import express from 'express'
import { NestedSubCategoryController } from './nestedSubCategory.controller'
import { UserRole } from '@prisma/client'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create-nested-sub-category',
  auth(UserRole.ADMIN),
  NestedSubCategoryController.createNestedSubCategory
)

router.get('/', NestedSubCategoryController.getAllNestedSubCategories)

router.get(
  '/:nestedSubCategoryId',
  NestedSubCategoryController.getSingleNestedSubCategory
)

router.put(
  '/:nestedSubCategoryId',
  auth(UserRole.ADMIN),
  NestedSubCategoryController.updateNestedSubCategory
)

router.delete(
  '/:nestedSubCategoryId',
  auth(UserRole.ADMIN),
  NestedSubCategoryController.deleteNestedSubCategory
)

export const nestedSubCategoryRoutes = router
