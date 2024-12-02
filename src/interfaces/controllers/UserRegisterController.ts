import { UserRegisterUseCase } from "../../app/use-cases/UserRegisterUseCase";
import { NextFunction, Request, Response } from "express";

export class UserRegisterController {
  constructor(private readonly userRegisterService: UserRegisterUseCase) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body;
      const jwe = this.userRegisterService.execute({
        email: body.email,
        senha: body.senha,
      });
      res.status(201).json(jwe);
    } catch (error) {
      next(error);
    }
  }
}
