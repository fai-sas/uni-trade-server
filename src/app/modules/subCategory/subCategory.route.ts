import express from 'express'

import { SubCategoryController } from './subCategory.controller'
import { UserRole } from '@prisma/client'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create-sub-category',
  auth(UserRole.ADMIN),
  SubCategoryController.createSubCategory
)

router.get('/', SubCategoryController.getAllSubCategories)

router.get('/:subCategoryId', SubCategoryController.getSingleSubCategory)

router.put(
  '/:subCategoryId',
  auth(UserRole.ADMIN),
  SubCategoryController.updateSubCategory
)

router.delete(
  '/:subCategoryId',
  auth(UserRole.ADMIN),
  SubCategoryController.deleteSubCategory
)

export const subCategoryRoutes = router
