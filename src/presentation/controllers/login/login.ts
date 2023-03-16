import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class LoginController implements Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve({
      statusCode: 400,
      body: ""
    }))
  }
}