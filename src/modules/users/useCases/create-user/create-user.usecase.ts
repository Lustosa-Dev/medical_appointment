import { CustomError } from "../../../../errors/custom.error";
import { ParameterRequiredError } from "../../../../errors/parameter-required.error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/ipassword.crypto";
import { User } from "../../Entities/user.entity";
import { IUserRepository } from "../../Repositories/iuser.repository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}

  async exec(data: UserRequest) {
    const user = User.create(data);

    if (!data.username || !data.password) {
      throw new ParameterRequiredError("username/password is required!", 422);
    }
    const existsUser = await this.userRepository.findByUsername(data.username);

    if (existsUser) {
      throw new CustomError("Username already exists!!", 400);
    }
    const passwordHashed = await this.passwordCrypto.hash(data.password);
    user.password = passwordHashed;
    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }
}
