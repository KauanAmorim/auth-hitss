import { UserRegisterHistoryUseCase } from "../../app/use-cases/UserRegisterHistoryUseCase";
import { NextFunction, Request, Response } from "express";

export class UserRegisterHistoryController {
  constructor(
    private readonly userRegisterHistoryService: UserRegisterHistoryUseCase
  ) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const history = this.userRegisterHistoryService.execute();
      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  }
}
