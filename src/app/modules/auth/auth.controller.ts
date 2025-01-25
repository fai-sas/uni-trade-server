import { Request } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthService } from './auth.service'
import httpStatus from 'http-status'
import { log } from 'node:console'

const createCustomer = catchAsync(async (req, res) => {
  const result = await AuthService.createCustomerIntoDb(req)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Customer Created Successfully!',
    data: result,
  })
})

const createVendor = catchAsync(async (req, res) => {
  const result = await AuthService.createVendorIntoDb(req)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Vendor Created Successfully!',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  console.log(req.body)

  const result = await AuthService.loginUserIntoDb(req.body)

  const { refreshToken } = result

  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
  })

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Logged in Successfully!',
    data: {
      accessToken: result.accessToken,
    },
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies

  const result = await AuthService.refreshToken(refreshToken)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Access token generated successfully!',
    data: result,
  })
})

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const user = req.user

    console.log('USER:', user, 'BODY:', req.body)

    const result = await AuthService.changePassword(user, req.body)

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Password Changed successfully',
      data: result,
    })
  }
)

const forgotPassword = catchAsync(async (req, res) => {
  await AuthService.forgotPassword(req.body)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Check your email to get reset password link!',
    data: null,
  })
})

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization || ''

  await AuthService.resetPassword(token, req.body)

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Reset Password!',
    data: null,
  })
})

export const AuthController = {
  createCustomer,
  createVendor,
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
}
