import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import status from 'http-status'
import { ProductService } from './product.service'
import { TAuthUser } from '../../interface/common'
import { Request, Response } from 'express'

const createProduct = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user

    const result = await ProductService.createProductIntoDb(user!, req)

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'Product Created Successfully!',
      data: result,
    })
  }
)

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProductsFromDb()

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'All Products Retrieved Successfully!',
    data: result,
  })
})

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params

  const result = await ProductService.getSingleProductFromDb(productId)

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: `Single Product With Id: ${productId} Retrieved Successfully!`,
    data: result,
  })
})

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params

  const result = await ProductService.updateProductIntoDb(productId, req.body)

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: `Product With Id: ${productId} Updated Successfully!`,
    data: result,
  })
})

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params

  const result = await ProductService.deleteProductFromDb(productId)

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: `Product With Id: ${productId} Deleted Successfully!`,
    data: result,
  })
})

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
