import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { ValidateLoginBody } from "../../protocols/validate-login-body";
import { badRequest, ok } from '../../helpers/http';
import { MissingParamError } from '../../errors/missing-param-error';
import { InvalidParamError } from '../../errors/invalid-param-error';

export class LoginController implements Controller {
  constructor(
    private validateLoginBody: ValidateLoginBody
  ) {}

  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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

    return new Promise(resolve => resolve(ok("Success")));
  }
}