import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { ValidateLoginBody } from "../../protocols/validate-login-body";
import { badRequest, notFound, ok, serverError } from '../../helpers/http';
import { MissingParamError } from '../../errors/missing-param-error';
import { InvalidParamError } from '../../errors/invalid-param-error';
import { CheckLogin } from "../../../domain/useCases/check-login";

export class LoginController implements Controller {
  constructor(
    private validateLoginBody: ValidateLoginBody,
    private checkLogin: CheckLogin
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;
      const validateReturn = this.validateLoginBody.validate(body);
      let returned: HttpResponse;
      if (validateReturn[0] === "MissingParam") {
        returned = badRequest(new MissingParamError(validateReturn[1]));
      } else if (validateReturn[0] === "InvalidParam") {
        returned = badRequest(new InvalidParamError(validateReturn[1], validateReturn[2]));
      }
      
      if (typeof returned !== "undefined") {
        return new Promise(resolve => resolve(returned));
      }

      const token = await this.checkLogin.check(body);
      if (typeof token !== "string") {
        return notFound();
      }

      return ok({ token });
    } catch (error) {
      return serverError();
    }
  }
}