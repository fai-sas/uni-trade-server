import { MainCategory, NestedSubCategory, SubCategory } from '@prisma/client'
import { Request } from 'express'
import status from 'http-status'
import prisma from '../../utils/prisma'
import { TAuthUser } from '../../interface/common'
import AppError from '../../errors/AppError'

const createNestedSubCategoryIntoDb = async (
  user: TAuthUser,
  req: Request
): Promise<NestedSubCategory> => {
  try {
    await prisma.user.findUniqueOrThrow({
      where: {
        email: user?.email,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Admin with email ${user?.email} not found.`
    )
  }

  try {
    await prisma.mainCategory.findUniqueOrThrow({
      where: {
        mainCategoryId: req.body?.mainCategoryId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Main Category with ID ${req.body?.mainCategoryId} Not Found.`
    )
  }

  try {
    await prisma.subCategory.findUniqueOrThrow({
      where: {
        subCategoryId: req.body?.subCategoryId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Sub Category with ID ${req.body?.subCategoryId} Not Found.`
    )
  }

  const result = await prisma.nestedSubCategory.create({
    data: req.body,
  })

  return result
}

const getAllNestedSubCategoriesFromDb = async () => {
  const result = await prisma.nestedSubCategory.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      mainCategory: true,
      subCategory: true,
    },
  })

  if (!result.length) {
    throw new AppError(
      status.NOT_FOUND,
      `No Nested Sub Category Found, Please Add Nested Sub Categories`
    )
  }

  return result
}

const getSingleNestedSubCategoryFromDb = async (
  nestedSubCategoryId: string
) => {
  const nestedSubCategory = await prisma.nestedSubCategory.findUniqueOrThrow({
    where: { nestedSubCategoryId },
  })

  if (!nestedSubCategory) {
    throw new AppError(
      status.NOT_FOUND,
      `Nested Sub Category with ID ${nestedSubCategoryId} Not Found.`
    )
  }

  if (nestedSubCategory.isDeleted) {
    throw new AppError(
      status.NOT_FOUND,
      'NestedSub Category is marked as deleted'
    )
  }

  const result = await prisma.nestedSubCategory.findUniqueOrThrow({
    where: {
      nestedSubCategoryId,
      isDeleted: false,
    },
    include: {
      mainCategory: true,
      subCategory: true,
    },
  })

  if (!result) {
    throw new AppError(
      status.NOT_FOUND,
      `Nested Sub Category with ID ${nestedSubCategoryId} Not Found.`
    )
  }

  return result
}

const updateNestedSubCategoryIntoDb = async (
  user: TAuthUser,
  nestedSubCategoryId: string,
  payload: Partial<MainCategory>
) => {
  try {
    await prisma.user.findUniqueOrThrow({
      where: {
        email: user?.email,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Admin with Email ${user?.email} Not Found.`
    )
  }

  try {
    await prisma.nestedSubCategory.findUniqueOrThrow({
      where: {
        nestedSubCategoryId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Nested Sub Category with ID ${nestedSubCategoryId} Not Found.`
    )
  }

  const result = await prisma.nestedSubCategory.update({
    where: {
      nestedSubCategoryId,
    },
    data: payload,
  })

  return result
}

const deleteNestedSubCategoryFromDb = async (
  user: TAuthUser,
  nestedSubCategoryId: string
) => {
  try {
    await prisma.user.findUniqueOrThrow({
      where: {
        email: user?.email,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Admin with Email ${user?.email} Not Found.`
    )
  }

  try {
    await prisma.nestedSubCategory.findUniqueOrThrow({
      where: {
        nestedSubCategoryId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Nested Sub Category with ID ${nestedSubCategoryId} Not Found.`
    )
  }

  const result = await prisma.nestedSubCategory.update({
    where: {
      nestedSubCategoryId,
    },
    data: {
      isDeleted: true,
    },
  })

  return result
}

export const NestedSubCategoryService = {
  createNestedSubCategoryIntoDb,
  getAllNestedSubCategoriesFromDb,
  getSingleNestedSubCategoryFromDb,
  updateNestedSubCategoryIntoDb,
  deleteNestedSubCategoryFromDb,
}
