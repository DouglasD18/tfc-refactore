import { Login } from "../models/login";

export interface CheckLogin {
  check(body: Login): Promise<string | boolean>
}