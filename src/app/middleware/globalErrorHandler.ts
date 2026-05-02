import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Config } from "../../config";
import { ZodError } from "zod";
import { handleZodError } from "./handleZodError";
import { handlePrismaError } from "./handlePrismaError";
import { IErrorSources } from "../../interface";
import { Prisma } from "../../generated/prisma/client";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let message = error.message || "Something went wrong";
  let statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  // console.log(error instanceof Prisma.PrismaClientKnownRequestError);
  let errorSources: IErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handlePrismaError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  res.status(statusCode).json({
    statusCode: statusCode,
    success: false,
    message: message,
    errorSources: errorSources,
    stack: Config.NODE_ENV === "development" && error.stack,
  });
};

export default globalErrorHandler;
