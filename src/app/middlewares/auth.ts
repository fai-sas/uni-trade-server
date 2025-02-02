import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError'
import { jwtHelpers } from '../utils/jwtHelpers'
import { Secret } from 'jsonwebtoken'
import config from '../config'
import status from 'http-status'

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization

      if (!token) {
        throw new AppError(status.UNAUTHORIZED, 'You are not authorized!')
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      )

      req.user = verifiedUser

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new AppError(status.FORBIDDEN, 'Forbidden!')
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}

export default auth
