/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { env } from '~/configs/enviroment';

export const errorHandingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  const responseError = {
    code: err.code || 101,
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack,
  };

  if (env.BUILD_MODE !== 'dev') delete responseError.stack;

  res.status(responseError.statusCode).json(responseError);
};
