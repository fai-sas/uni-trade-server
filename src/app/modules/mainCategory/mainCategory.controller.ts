import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { MainCategoryService } from './mainCategory.service'
import { Request, Response } from 'express'
import { TAuthUser } from '../../interface/common'

const createMainCategory = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user

    const result = await MainCategoryService.createMainCategoryIntoDb(
      user!,
      req
    )

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'Main Category Created Successfully!',
      data: result,
    })
  }
)

const getAllMainCategories = catchAsync(async (req, res) => {
  const result = await MainCategoryService.getAllMainCategoriesFromDb()

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'All Main Categories Retrieved Successfully!',
    data: result,
  })
})

const getSingleMainCategory = catchAsync(async (req, res) => {
  const { mainCategoryId } = req.params

  const result = await MainCategoryService.getSingleMainCategoryFromDb(
    mainCategoryId
  )

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: `Single Category With Id: ${mainCategoryId} Retrieved Successfully!`,
    data: result,
  })
})

const updateMainCategory = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    const { mainCategoryId } = req.params

    const result = await MainCategoryService.updateMainCategoryIntoDb(
      user!,
      mainCategoryId,
      req.body
    )

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: `Category With Id: ${mainCategoryId} Updated Successfully!`,
      data: result,
    })
  }
)

const deleteMainCategory = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    const { mainCategoryId } = req.params

    const result = await MainCategoryService.deleteMainCategoryFromDb(
      user!,
      mainCategoryId
    )

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: `Category With Id: ${mainCategoryId} Deleted Successfully!`,
      data: result,
    })
  }
)

export const MainCategoryController = {
  createMainCategory,
  getAllMainCategories,
  getSingleMainCategory,
  updateMainCategory,
  deleteMainCategory,
}
