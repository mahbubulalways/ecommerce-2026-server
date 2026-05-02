import { Prisma } from "../../generated/prisma/client";
import { IErrorSources, IGenericErrorResponse } from "../../interface";

/**
 * Handle all Prisma errors in one place
 */
export const handlePrismaError = (
  err: Prisma.PrismaClientKnownRequestError,
): IGenericErrorResponse => {
  const errorSources: IErrorSources = [];
  let message = "Database error";
  let statusCode = 400;

  // Unique constraint violation
  if (err.code === "P2002") {
    const fields = Array.isArray(err.meta?.target)
      ? err.meta.target
      : [err.meta?.target];

    fields.forEach((field) => {
      errorSources.push({
        path: field as string,
        message: `The value for "${field}" already exists.`,
      });
    });
    message = "Unique constraint violation";
  }

  // Foreign key violation
  else if (err.code === "P2003") {
    // Fallback: use model name if field/constraint undefined
    const tableOrModel =
      (err.meta?.field_name as string) ||
      (err.meta?.constraint as string) ||
      (err.meta?.modelName as string) ||
      "unknown";

    errorSources.push({
      path: tableOrModel,
      message: `Foreign key constraint failed in table/model "${tableOrModel}".`,
    });
    message = "Foreign key constraint violation";
  }

  // Record not found / delete/update failed
  else if (err.code === "P2025") {
    message = "Record not found or operation failed";
    errorSources.push({
      path: "",
      message: err.message,
    });
  }

  // All other Prisma errors
  else {
    errorSources.push({
      path: "",
      message: err.message,
    });
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};
