import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SubCategoryService } from './subCategory.service'
import { Request, Response } from 'express'
import { TAuthUser } from '../../interface/common'

const createSubCategory = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user

    const result = await SubCategoryService.createSubCategoryIntoDb(user!, req)

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'Sub Category Created Successfully!',
      data: result,
    })
  }
)

const getAllSubCategories = catchAsync(async (req, res) => {
  const result = await SubCategoryService.getAllSubCategoriesFromDb()

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'All Sub Categories Retrieved Successfully!',
    data: result,
  })
})

const getSingleSubCategory = catchAsync(async (req, res) => {
  const { subCategoryId } = req.params

  const result = await SubCategoryService.getSingleSubCategoryFromDb(
    subCategoryId
  )

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: `Single Category With Id: ${subCategoryId} Retrieved Successfully!`,
    data: result,
  })
})

const updateSubCategory = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    const { subCategoryId } = req.params

    const result = await SubCategoryService.updateSubCategoryIntoDb(
      user!,
      subCategoryId,
      req.body
    )

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: `Category With Id: ${subCategoryId} Updated Successfully!`,
      data: result,
    })
  }
)

const deleteSubCategory = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    const { subCategoryId } = req.params

    const result = await SubCategoryService.deleteSubCategoryFromDb(
      user!,
      subCategoryId
    )

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: `Category With Id: ${subCategoryId} Deleted Successfully!`,
      data: result,
    })
  }
)

export const SubCategoryController = {
  createSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
}
