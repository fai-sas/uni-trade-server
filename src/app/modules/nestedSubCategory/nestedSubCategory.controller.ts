import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { NestedSubCategoryService } from './nestedSubCategory.service'
import { Request, Response } from 'express'
import { TAuthUser } from '../../interface/common'

const createNestedSubCategory = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    const result = await NestedSubCategoryService.createNestedSubCategoryIntoDb(
      user!,
      req
    )

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'Sub Category Created Successfully!',
      data: result,
    })
  }
)

const getAllNestedSubCategories = catchAsync(async (req, res) => {
  const result =
    await NestedSubCategoryService.getAllNestedSubCategoriesFromDb()

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'All Nested Sub Categories Retrieved Successfully!',
    data: result,
  })
})

const getSingleNestedSubCategory = catchAsync(async (req, res) => {
  const { nestedSubCategoryId } = req.params

  const result =
    await NestedSubCategoryService.getSingleNestedSubCategoryFromDb(
      nestedSubCategoryId
    )

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: `Single Nested Sub Category With Id: ${nestedSubCategoryId} Retrieved Successfully!`,
    data: result,
  })
})

const updateNestedSubCategory = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    const { nestedSubCategoryId } = req.params

    const result = await NestedSubCategoryService.updateNestedSubCategoryIntoDb(
      user!,
      nestedSubCategoryId,
      req.body
    )

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: `Nested Sub Category With Id: ${nestedSubCategoryId} Updated Successfully!`,
      data: result,
    })
  }
)

const deleteNestedSubCategory = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    const { nestedSubCategoryId } = req.params

    const result = await NestedSubCategoryService.deleteNestedSubCategoryFromDb(
      user!,
      nestedSubCategoryId
    )

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: `Nested Sub Category With Id: ${nestedSubCategoryId} Deleted Successfully!`,
      data: result,
    })
  }
)

export const NestedSubCategoryController = {
  createNestedSubCategory,
  getAllNestedSubCategories,
  getSingleNestedSubCategory,
  updateNestedSubCategory,
  deleteNestedSubCategory,
}
