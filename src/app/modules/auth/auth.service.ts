import * as bcrypt from 'bcrypt'
import { Request } from 'express'
import AppError from '../../errors/AppError'
import { jwtHelpers } from '../../utils/jwtHelpers'
import config from '../../config'
import { Secret } from 'jsonwebtoken'
import emailSender from '../../utils/emailSender'
import status from 'http-status'
import prisma from '../../utils/prisma'
import { Customer, UserRole, UserStatus, Vendor } from '@prisma/client'

const createCustomerIntoDb = async (req: Request): Promise<Customer> => {
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

  const userData = {
    email: req.body.customer.email,
    password: hashedPassword,
    role: UserRole.CUSTOMER,
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    })

    const createdCustomerData = await transactionClient.customer.create({
      data: req.body.customer,
    })

    return createdCustomerData
  })

  return result
}

const createVendorIntoDb = async (req: Request): Promise<Vendor> => {
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

  const userData = {
    email: req.body.vendor.email,
    password: hashedPassword,
    role: UserRole.VENDOR,
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    })

    const createdVendorData = await transactionClient.vendor.create({
      data: req.body.vendor,
    })

    return createdVendorData
  })

  return result
}

const loginUserIntoDb = async (payload: {
  email: string
  password: string
}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  })

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  )

  if (!isCorrectPassword) {
    throw new AppError(status.BAD_REQUEST, 'Incorrect Password!')
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (refreshToken: string) => {
  let decodedData

  try {
    decodedData = jwtHelpers.verifyToken(
      refreshToken,
      config.jwt.refresh_token_secret as Secret
    )
  } catch (err) {
    throw new AppError(status.FORBIDDEN, 'You are not authorized!')
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  })

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken,
  }
}

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  })
  console.log('USERDATA:', userData)

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  )

  if (!isCorrectPassword) {
    throw new AppError(status.BAD_REQUEST, 'Password incorrect!')
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12)

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
    },
  })

  return {
    message: 'Password changed successfully!',
  }
}

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  })

  const resetPassToken = jwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.reset_pass_secret as Secret,
    config.jwt.reset_pass_token_expires_in as string
  )
  //console.log(resetPassToken)

  const resetPassLink =
    config.reset_pass_link +
    `?userId=${userData.createdAt}&token=${resetPassToken}`

  await emailSender(
    userData.email,
    `
     <div style="font-family: Arial, sans-serif; color: #333;">
    <p>Dear User,</p>
    <p>We received a request to reset your password. To proceed, please click the button below:</p>
    <a href="${resetPassLink}" style="text-decoration: none;">
        <button style="background-color: #007BFF; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
            Reset Password
        </button>
    </a>
    <p>If you didn't request a password reset, please ignore this email or contact support if you have any questions.</p>
    <p>Best regards,<br/>Your Company Team</p>
</div>


        `
  )
}

const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  console.log({ token, payload })

  await prisma.user.findUniqueOrThrow({
    where: {
      userId: payload.id,
      status: UserStatus.ACTIVE,
    },
  })

  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.jwt.reset_pass_secret as Secret
  )

  if (!isValidToken) {
    throw new AppError(status.FORBIDDEN, 'Forbidden!')
  }

  // hash password
  const newPassword = await bcrypt.hash(payload.password, 12)

  // update into database
  await prisma.user.update({
    where: {
      userId: payload.id,
    },
    data: {
      password: newPassword,
    },
  })
}

export const AuthService = {
  createCustomerIntoDb,
  createVendorIntoDb,
  loginUserIntoDb,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
}
