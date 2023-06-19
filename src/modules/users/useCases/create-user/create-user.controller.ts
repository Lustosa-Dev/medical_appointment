import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.usecase";
import { Logger } from "../../../../utils/logger";
import { IUserRepository } from "../../Repositories/iuser.repository";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/ipassword.crypto";

export class CreateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}

  async handle(request: Request, response: Response) {
    Logger.info("Usuário sendo criado!!");
    try {
      const data = request.body;

      const useCase = new CreateUserUseCase(
        this.userRepository,
        this.passwordCrypto
      );
      const result = await useCase.exec(data);

      return response.json(result);
    } catch (err: any) {
      Logger.error(err.stack);
      return response.status(err.statusCode).json(err.message);
    }
  }
}
