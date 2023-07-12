import { PassordBcrypt } from "../../../../infra/shared/crypto/passord.bcrypt";
import { JwtToken } from "../../../../infra/shared/token/jwt.token";
import { UserPrismaRepository } from "../../Repositories/implementatios/user.prisma.repository";
import { AuthenticateUserController } from "./authenticate-user.controller";

const userPrismaRepository = new UserPrismaRepository();
const passwordBcrypt = new PassordBcrypt();
const token = new JwtToken();

const authenticateUserController = new AuthenticateUserController(
  userPrismaRepository,
  passwordBcrypt,
  token
);

export { authenticateUserController };
