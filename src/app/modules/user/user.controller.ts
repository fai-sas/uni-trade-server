import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserService } from './user.service'
import status from 'http-status'
import { TAuthUser } from '../../interface/common'

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsersFromDb()

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'All Users Retrieved Successfully!',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params

  const result = await UserService.getSingleUserFromDb(userId)

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: `User With Id: ${userId} Retrieved Successfully!`,
    data: result,
  })
})

const getAllVendors = catchAsync(async (req, res) => {
  const result = await UserService.getAllVendorsFromDb()

  sendResponse(res, {
    success: true,
    status: status.OK,
    message: 'Vendors retrieved successfully',
    data: result,
  })
})

const getSingleVendor = catchAsync(async (req, res) => {
  const { vendorId } = req.params

  const result = await UserService.getSingleVendorFromDb(vendorId)

  sendResponse(res, {
    success: true,
    status: status.OK,
    message: `Vendor With Id: ${vendorId} Retrieved Successfully!`,
    data: result,
  })
})

const getMyProfile = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user
    const result = await UserService.getMyProfileFromDb(user as TAuthUser)

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'My profile data fetched!',
      data: result,
    })
  }
)

export const UserController = {
  getAllUsers,
  getSingleUser,
  getAllVendors,
  getSingleVendor,
  getMyProfile,
}
