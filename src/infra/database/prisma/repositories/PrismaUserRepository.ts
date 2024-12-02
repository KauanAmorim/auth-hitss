import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { User } from "../../../../domain/entities/User";

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new PrismaUserRepository(prismaClient);
  }

  public async save(user: User) {
    const data = {
      id: user.id,
      email: user.email,
      senha: user.senha,
      jwe: user.jwe,
      dataCriacao: user.dataCriacao,
    };

    await this.prismaClient.user.create({ data });
  }

  public async findAll(): Promise<User[]> {
    const users = await this.prismaClient.user.findMany();
    const userList = users.map((user) => {
      return new User({
        id: user.id,
        email: user.email,
        senha: user.senha,
        jwe: user.jwe,
        dataCriacao: user.dataCriacao,
      });
    });

    return userList;
  }
}
