import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || httpStatus.INTERNAL_SERVER_ERROR

  res.status(status).json({
    success: false,
    status: status,
    message: err.message || 'Something went wrong!',
    error: err,
  })
}

export default globalErrorHandler
