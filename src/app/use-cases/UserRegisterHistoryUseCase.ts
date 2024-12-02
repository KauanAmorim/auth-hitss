import { User } from "../../domain/entities/User"
import { IUserRepository } from "../../domain/repositories/IUserRepository"

export type userHistoryOutput = {
    id: string,
    email: string,
    senha: string,
    jwe: string,
    dataCriacao: Date
}

export class UserRegisterHistoryUseCase {
    constructor(private userRepository: IUserRepository) {}
    async execute(): Promise<userHistoryOutput[]>{
        const userHistory = await this.userRepository.findAll();
        return userHistory;
    }
}