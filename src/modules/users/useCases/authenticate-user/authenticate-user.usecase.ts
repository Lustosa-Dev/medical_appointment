import { CustomError } from "../../../../errors/custom.error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/ipassword.crypto";
import { IToken } from "../../../../infra/shared/token/token";
import { IUserRepository } from "../../Repositories/iuser.repository";

type AuthenticateRequest = {
  username: string;
  password: string;
};

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
    private token: IToken
  ) {}

  async exec({ username, password }: AuthenticateRequest) {
    if (!username || !password) {
      throw new CustomError("Username/Password incorrect", 401);
    }

    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new CustomError("Username/Password incorrect", 401);
    }

    const comparePasswordIsEquals = await this.passwordCrypto.compare(
      password,
      user.password
    );
    if (!comparePasswordIsEquals) {
      throw new CustomError("Username/Password incorrect", 401);
    }

    const tokenGenerate = this.token.create(user);

    return tokenGenerate;
  }
}
