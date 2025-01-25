import { MainCategory, SubCategory } from '@prisma/client'
import { Request } from 'express'
import status from 'http-status'
import prisma from '../../utils/prisma'
import AppError from '../../errors/AppError'
import { TAuthUser } from '../../interface/common'

const createSubCategoryIntoDb = async (
  user: TAuthUser,
  req: Request
): Promise<SubCategory> => {
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

  const result = await prisma.subCategory.create({
    data: req.body,
  })

  return result
}

const getAllSubCategoriesFromDb = async () => {
  const result = await prisma.subCategory.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      mainCategory: true,
      nestedSubCategory: true,
    },
  })

  if (!result.length) {
    throw new AppError(
      status.NOT_FOUND,
      `No Sub Category Found, Please Add Sub Categories`
    )
  }

  return result
}

const getSingleSubCategoryFromDb = async (subCategoryId: string) => {
  const subCategory = await prisma.subCategory.findUniqueOrThrow({
    where: { subCategoryId },
  })

  if (!subCategory) {
    throw new AppError(
      status.NOT_FOUND,
      `Sub Category with ID ${subCategoryId} Not Found.`
    )
  }

  if (subCategory.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Sub Category is marked as deleted')
  }

  const result = await prisma.subCategory.findUniqueOrThrow({
    where: { subCategoryId },
    include: {
      mainCategory: true,
      nestedSubCategory: true,
    },
  })

  if (!result) {
    throw new AppError(
      status.NOT_FOUND,
      `Sub Category with ID ${subCategoryId} Not Found.`
    )
  }

  return result
}

const updateSubCategoryIntoDb = async (
  user: TAuthUser,
  subCategoryId: string,
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
    await prisma.subCategory.findUniqueOrThrow({
      where: {
        subCategoryId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Sub Category with ID ${subCategoryId} Not Found.`
    )
  }

  const result = await prisma.subCategory.update({
    where: {
      subCategoryId,
    },
    data: payload,
  })

  return result
}

const deleteSubCategoryFromDb = async (
  user: TAuthUser,
  subCategoryId: string
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
    await prisma.subCategory.findUniqueOrThrow({
      where: {
        subCategoryId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Sub Category with ID ${subCategoryId} Not Found.`
    )
  }

  const result = await prisma.subCategory.update({
    where: {
      subCategoryId,
    },
    data: {
      isDeleted: true,
    },
  })

  return result
}

export const SubCategoryService = {
  createSubCategoryIntoDb,
  getAllSubCategoriesFromDb,
  getSingleSubCategoryFromDb,
  updateSubCategoryIntoDb,
  deleteSubCategoryFromDb,
}
