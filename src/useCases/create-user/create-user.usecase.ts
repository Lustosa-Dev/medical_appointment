import { User } from "../../Entities/user.entity";
import { UserRepository } from "../../Repositories/user.repository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  async exec(data: UserRequest) {
    const userRepository = UserRepository.getInstance();
    const user = User.create(data);

    if (!data.username || !data.password) {
      throw new Error("username/password is required!");
    }
    const existsUser = await userRepository.findByUsername(data.username);

    if (existsUser) {
      throw new Error("Username already exists!!");
    }
    const userCreated = await userRepository.save(user);
    return userCreated;
  }
}
