import { Products } from '@prisma/client'
import prisma from '../../utils/prisma'
import { Request } from 'express'
import { TAuthUser } from '../../interface/common'
import AppError from '../../errors/AppError'
import status from 'http-status'

const createProductIntoDb = async (
  user: TAuthUser,
  req: Request
): Promise<Products> => {
  try {
    await prisma.vendor.findUniqueOrThrow({
      where: {
        email: user?.email,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Vendor with email ${user?.email} not found.`
    )
  }

  try {
    await prisma.mainCategory.findUniqueOrThrow({
      where: {
        mainCategoryId: req.body.mainCategoryId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Main Category with ID ${req.body.mainCategoryId} not found.`
    )
  }

  try {
    await prisma.subCategory.findUniqueOrThrow({
      where: {
        subCategoryId: req.body.subCategoryId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Sub Category with ID ${req.body.subCategoryId} not found.`
    )
  }

  try {
    await prisma.nestedSubCategory.findUniqueOrThrow({
      where: {
        nestedSubCategoryId: req.body.nestedSubCategoryId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Nested Sub Category with ID ${req.body.nestedSubCategoryId} not found.`
    )
  }

  const result = await prisma.products.create({
    data: { ...req.body, vendorEmail: user?.email },
  })

  return result
}

const getAllProductsFromDb = async () => {
  const result = await prisma.products.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      vendor: true,
      mainCategory: true,
      subCategory: true,
      nestedSubCategory: true,
    },
  })

  if (!result.length) {
    throw new AppError(
      status.NOT_FOUND,
      `No Product Found!! Please Add Some Products`
    )
  }

  return result
}

const getSingleProductFromDb = async (productId: string) => {
  try {
    await prisma.products.findUniqueOrThrow({
      where: {
        productId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Product with ID ${productId} not found.`
    )
  }

  const result = await prisma.products.findMany({
    where: {
      productId,
      isDeleted: false,
    },
    include: {
      vendor: true,
      mainCategory: true,
      subCategory: true,
      nestedSubCategory: true,
      cart: true,
    },
  })

  if (!result.length) {
    throw new AppError(
      status.NOT_FOUND,
      `Product with ID ${productId} not found.`
    )
  }

  return result
}

const updateProductIntoDb = async (
  productId: string,
  payload: Partial<Products>
) => {
  try {
    await prisma.products.findUniqueOrThrow({
      where: {
        productId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Product with ID ${productId} not found.`
    )
  }

  const result = await prisma.products.update({
    where: {
      productId,
    },
    data: payload,
  })

  return result
}

const deleteProductFromDb = async (productId: string) => {
  try {
    await prisma.products.findUniqueOrThrow({
      where: {
        productId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Product with ID ${productId} not found.`
    )
  }

  const result = await prisma.products.update({
    where: {
      productId,
    },
    data: {
      isDeleted: true,
    },
  })

  return result
}

export const ProductService = {
  createProductIntoDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
  updateProductIntoDb,
  deleteProductFromDb,
}
