import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { ValidateLoginBody } from "../../protocols/validate-login-body";

export class LoginController implements Controller {
  constructor(
    private validateLoginBody: ValidateLoginBody
  ) {}

  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve({
      statusCode: 400,
      body: ""
    }))
  }
}