import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof Error) {
    res.status(500).json({
      type: "url-error-type",
      title: "error title",
      status: "error status",
      details: "error details",
    });
  } else {
    res.status(500).json({
      type: "url-error-type",
      title: "error title",
      status: "error status",
      details: "error details",
    });
  }
}
