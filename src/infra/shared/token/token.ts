import { User } from "../../../modules/users/Entities/user.entity";

export interface IToken {
  create(user: User): string;
  validate(token: string): boolean;
}
