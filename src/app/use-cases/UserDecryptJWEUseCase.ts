import { IJWEService } from "../../domain/services/IJWEService";
import { UserDecryptJWEValidator } from "../../infra/validators/UserDecryptJWEInputValidator";

export type UserDecryptJWEInputDto = {
  jwe: string;
};
export type UserDecryptJWEOutputDto = {
  jweDecrypted: string;
};

export class UserDecryptJWEUseCase {
  constructor(private jweService: IJWEService) {}
  async execute(
    input: UserDecryptJWEInputDto
  ): Promise<UserDecryptJWEOutputDto> {
    const validatedBody = UserDecryptJWEValidator.parse(input);
    const jweDecrypted = await this.jweService.decryptJWE(validatedBody.jwe);
    return { jweDecrypted };
  }
}
