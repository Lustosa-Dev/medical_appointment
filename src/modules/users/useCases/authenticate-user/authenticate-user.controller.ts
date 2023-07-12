import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";
import { IUserRepository } from "../../Repositories/iuser.repository";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/ipassword.crypto";
import { IToken } from "../../../../infra/shared/token/token";

export class AuthenticateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
    private token: IToken
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const data = request.body;
      const authenticateUserUseCase = new AuthenticateUserUseCase(
        this.userRepository,
        this.passwordCrypto,
        this.token
      );
      const result = await authenticateUserUseCase.exec(data);

      return response.json(result);
    } catch (err: any) {
      return response.status(401).json({
        error: err.message,
      });
    }
  }
}
