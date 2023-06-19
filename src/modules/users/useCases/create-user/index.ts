import { PassordBcrypt } from "../../../../infra/shared/crypto/passord.bcrypt";
import { UserPrismaRepository } from "../../Repositories/implementatios/user.prisma.repository";
import { CreateUserController } from "./create-user.controller";

const userPrismaRepository = new UserPrismaRepository();
const passwordBcrypt = new PassordBcrypt();
const createUserController = new CreateUserController(
  userPrismaRepository,
  passwordBcrypt
);

export { createUserController };
