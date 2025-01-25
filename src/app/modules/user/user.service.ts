import status from 'http-status'
import AppError from '../../errors/AppError'
import prisma from '../../utils/prisma'
import { UserRole, UserStatus } from '@prisma/client'
import { TAuthUser } from '../../interface/common'

const getAllUsersFromDb = async () => {
  const result = await prisma.user.findMany({
    where: {
      status: 'ACTIVE',
    },
    include: {
      customer: true,
      vendor: true,
    },
  })

  return result
}

const getSingleUserFromDb = async (userId: string) => {
  try {
    await prisma.user.findUniqueOrThrow({
      where: {
        userId,
      },
    })
  } catch (error) {
    throw new AppError(status.NOT_FOUND, `User with ID ${userId} not found.`)
  }

  const result = await prisma.user.findUniqueOrThrow({
    where: {
      userId,
      status: 'ACTIVE',
    },
    include: {
      customer: true,
      vendor: true,
    },
  })

  return result
}

const getAllVendorsFromDb = async () => {
  const result = await prisma.vendor.findMany({
    include: {
      user: true,
      products: true,
    },
  })

  return result
}

const getSingleVendorFromDb = async (vendorId: string) => {
  try {
    await prisma.vendor.findUniqueOrThrow({
      where: {
        vendorId,
      },
    })
  } catch (error) {
    throw new AppError(
      status.NOT_FOUND,
      `Vendor with ID ${vendorId} not found.`
    )
  }

  const result = await prisma.vendor.findUniqueOrThrow({
    where: {
      vendorId,
    },
    include: {
      user: true,
      products: true,
    },
  })

  return result
}

const getMyProfileFromDb = async (user: TAuthUser) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      userId: true,
      email: true,
      role: true,
      status: true,
    },
  })

  let profileInfo

  if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    })
  } else if (userInfo.role === UserRole.VENDOR) {
    profileInfo = await prisma.vendor.findUnique({
      where: {
        email: userInfo.email,
      },
    })
  } else if (userInfo.role === UserRole.CUSTOMER) {
    profileInfo = await prisma.customer.findUnique({
      where: {
        email: userInfo.email,
      },
      include: {
        cart: true,
      },
    })
  }

  return { ...userInfo, ...profileInfo }
}

export const UserService = {
  getAllUsersFromDb,
  getSingleUserFromDb,
  getAllVendorsFromDb,
  getSingleVendorFromDb,
  getMyProfileFromDb,
}
