import { UserDecryptJWEUseCase } from "../../app/use-cases/UserDecryptJWEUseCase";
import { NextFunction, Request, Response } from "express";

export class UserDecryptJWEController {
  constructor(
    private readonly userDecryptJWEService: UserDecryptJWEUseCase,
  ) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body;
      const jweDecrypted = this.userDecryptJWEService.execute({
        jwe: body.jwe,
      });
      res.status(200).json(jweDecrypted);
    } catch (error) {
      next(error);
    }
  }
}
