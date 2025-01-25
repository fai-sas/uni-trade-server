import { Request, Response } from 'express'
import { TAuthUser } from '../../interface/common'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CartService } from './cart.service'
import status from 'http-status'

const createCart = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user

    console.log(req.body)

    const result = await CartService.createCartIntoDb(user!, req)

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'Product Added Successfully to Cart!',
      data: result,
    })
  }
)

const getAllCarts = catchAsync(async (req, res) => {
  const result = await CartService.getAllCarts()

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'All Carts Retrieved Successfully!',
    data: result,
  })
})

const getSingleCart = catchAsync(async (req, res) => {
  const { cartId } = req.params

  const result = await CartService.getSingleCartFromDb(cartId)

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: `Single Cart With Id: ${cartId} Retrieved Successfully!`,
    data: result,
  })
})

export const CartController = {
  createCart,
  getAllCarts,
  getSingleCart,
}
