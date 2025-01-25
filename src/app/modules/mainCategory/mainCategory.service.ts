import { MainCategory } from '@prisma/client'
import { Request } from 'express'
import status from 'http-status'
import prisma from '../../utils/prisma'
import { TAuthUser } from '../../interface/common'
import AppError from '../../errors/AppError'

const createMainCategoryIntoDb = async (
  user: TAuthUser,
  req: Request
): Promise<MainCategory> => {
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

  const result = await prisma.mainCategory.create({
    data: req.body,
  })

  return result
}

const getAllMainCategoriesFromDb = async () => {
  const result = await prisma.mainCategory.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      products: true,
      subCategory: true,
      nestedSubCategory: true,
    },
  })

  if (!result.length) {
    throw new AppError(
      status.NOT_FOUND,
      `No Main Category Found, Please Add Main Categories`
    )
  }

  return result
}

const getSingleMainCategoryFromDb = async (mainCategoryId: string) => {
  try {
    const result = await prisma.mainCategory.findUniqueOrThrow({
      where: { mainCategoryId },
      include: {
        subCategory: true,
        nestedSubCategory: true,
      },
    })

    return result
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Main Category with ID ${mainCategoryId} Not Found.`
    )
  }
}

const updateMainCategoryIntoDb = async (
  user: TAuthUser,
  mainCategoryId: string,
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
    await prisma.mainCategory.findUniqueOrThrow({
      where: {
        mainCategoryId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Main Category with ID ${mainCategoryId} Not Found.`
    )
  }

  const result = await prisma.mainCategory.update({
    where: {
      mainCategoryId,
    },
    data: payload,
  })

  return result
}

const deleteMainCategoryFromDb = async (
  user: TAuthUser,
  mainCategoryId: string
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
    await prisma.mainCategory.findUniqueOrThrow({
      where: {
        mainCategoryId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Main Category with ID ${mainCategoryId} Not Found.`
    )
  }

  const result = await prisma.mainCategory.update({
    where: {
      mainCategoryId,
    },
    data: {
      isDeleted: true,
    },
  })

  return result
}

export const MainCategoryService = {
  createMainCategoryIntoDb,
  getAllMainCategoriesFromDb,
  getSingleMainCategoryFromDb,
  updateMainCategoryIntoDb,
  deleteMainCategoryFromDb,
}
