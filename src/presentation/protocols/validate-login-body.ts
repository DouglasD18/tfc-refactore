import { Login } from "../../domain/models/login";

export interface ValidateLoginBody {
  validate(body: Login): boolean | string;
}