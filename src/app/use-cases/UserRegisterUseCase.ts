import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IJWEService } from "../../domain/services/IJWEService";
import { UserRegisterInputValidator } from "../../infra/validators/UserRegisterInputValidator";

export type UserRegisterInputDto = {
  email: string;
  senha: string;
};
export type UserRegisterOutputDto = {
  jwe: string;
};

export class UserRegisterUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jweService: IJWEService
  ) {}
  async execute(input: UserRegisterInputDto): Promise<UserRegisterOutputDto> {
    const validatedBody = UserRegisterInputValidator.parse(input);
    const jwe = await this.jweService.generateJWE(
      {
        email: validatedBody.email,
        senha: validatedBody.senha,
        dataCriacao: new Date(),
      }
    );

    const userEntity = User.create(validatedBody.email, validatedBody.senha, jwe);
    this.userRepository.save(userEntity);

    return {
      jwe: jwe,
    };
  }
}
