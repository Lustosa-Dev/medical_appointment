import { IPasswordCrypto } from "./ipassword.crypto";
import bcrypt from "bcryptjs";

export class PassordBcrypt implements IPasswordCrypto {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
