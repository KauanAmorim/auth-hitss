import { Router } from "express";
import { UserRegisterHistoryController } from "../controllers/UserRegisterHistoryController";
import { UserDecryptJWEController } from "../controllers/UserDecryptJWEController";
import { UserRegisterController } from "../controllers/UserRegisterController";
import { UserRegisterHistoryUseCase } from "../../app/use-cases/UserRegisterHistoryUseCase";
import { UserDecryptJWEUseCase } from "../../app/use-cases/UserDecryptJWEUseCase";
import { UserRegisterUseCase } from "../../app/use-cases/UserRegisterUseCase";
import { PrismaUserRepository } from "../../infra/database/prisma/repositories/PrismaUserRepository"
import { JWEService } from "../../infra/JWE/JWEService";
import { prisma } from "../../infra/database/prisma/prisma";

const UserRoutes = Router();
const userRepository = new PrismaUserRepository(prisma);
const jweService = new JWEService();

const userRegisterUseCase = new UserRegisterUseCase(userRepository, jweService);
const userRegisterController = new UserRegisterController(userRegisterUseCase);
UserRoutes.post('/register', userRegisterController.execute);

const userDecryptJWEUseCase = new UserDecryptJWEUseCase(jweService);
const userDecryptJWEController = new UserDecryptJWEController(userDecryptJWEUseCase);
UserRoutes.post('/decrypt', userDecryptJWEController.execute);

const userRegisterHistoryUseCase = new UserRegisterHistoryUseCase(userRepository);
const userRegisterHistoryController = new UserRegisterHistoryController(userRegisterHistoryUseCase);
UserRoutes.get('/history', userRegisterHistoryController.execute);

export default UserRoutes;