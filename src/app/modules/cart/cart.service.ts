import { Cart } from '@prisma/client'
import prisma from '../../utils/prisma'
import { Request } from 'express'
import AppError from '../../errors/AppError'
import status from 'http-status'
import { TAuthUser } from '../../interface/common'

// const createCartIntoDb = async (
//   user: TAuthUser,
//   req: Request
// ): Promise<Cart> => {
//   try {
//     await prisma.customer.findUniqueOrThrow({
//       where: {
//         email: user?.email,
//       },
//     })
//   } catch (error) {
//     throw new AppError(
//       status.NOT_FOUND,
//       `Customer with email ${user?.email} not found.`
//     )
//   }

//   try {
//     await prisma.products.findUniqueOrThrow({
//       where: {
//         productId: req.body?.productId,
//       },
//     })
//   } catch (error) {
//     throw new AppError(
//       status.NOT_FOUND,
//       ` Product with ${req.body?.productId} not found.`
//     )
//   }

//   const result = await prisma.cart.create({
//     data: { ...req.body, customer: user?.email },
//   })

//   return result
// }

const createCartIntoDb = async (
  user: TAuthUser,
  req: Request
): Promise<Cart> => {
  const { productId } = req.body

  // Check if customer exists
  const customer = await prisma.customer.findUnique({
    where: { email: user?.email },
  })
  if (!customer) {
    throw new AppError(
      status.NOT_FOUND,
      `Customer with email ${user?.email} not found.`
    )
  }

  // Check if product exists
  const product = await prisma.products.findUnique({
    where: { productId },
  })
  if (!product) {
    throw new AppError(
      status.NOT_FOUND,
      `Product with ID ${productId} not found.`
    )
  }

  // Check if the product is already in the cart
  const existingCartEntry = await prisma.cart.findUnique({
    where: {
      customerEmail_productId: { customerEmail: user?.email, productId }, // Using composite key
    },
  })

  if (existingCartEntry) {
    throw new AppError(status.CONFLICT, 'Product is already in the cart.')
  }

  // Add product to cart with correct customer relation
  const result = await prisma.cart.create({
    data: {
      customer: user?.email,
      products: {
        connect: { productId }, // Connect the existing product
      },
      customer: {
        connect: { email: user?.email }, // Connect the existing customer
      },
    },
  })

  return result
}

const getAllCarts = async () => {
  const result = await prisma.cart.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      customer: true,
      products: true,
    },
  })

  if (!result.length) {
    throw new AppError(
      status.NOT_FOUND,
      `No Cart Found!! Please Add Some Products to Cart`
    )
  }

  return result
}

const getSingleCartFromDb = async (cartId: string) => {
  try {
    await prisma.cart.findUniqueOrThrow({
      where: {
        cartId,
      },
    })
  } catch (error) {
    throw new AppError(status.NOT_FOUND, `Cart with ID ${cartId} not found.`)
  }

  const result = await prisma.cart.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      customer: true,
      products: true,
    },
  })

  return result
}

export const CartService = {
  createCartIntoDb,
  getAllCarts,
  getSingleCartFromDb,
}
