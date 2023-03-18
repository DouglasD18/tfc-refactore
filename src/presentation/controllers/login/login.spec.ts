import { describe, expect, it, vi } from "vitest";
import { LoginController } from './login';
import { ValidateLoginBody } from "../../protocols/validate-login-body";
import { Login } from "../../../domain/models/login";
import { HttpRequest } from '../../protocols/http';

const httpRequestStub: HttpRequest = {
  body: {
    email: "valid@mail.com",
    password: "valid_password"
  }
}

const makeValidateLoginBodyStub = (): ValidateLoginBody => {
  class ValidateLginBodyStub implements ValidateLoginBody {
    validate(body: Login): boolean | string[] {
      return true;
    }
  }

  return new ValidateLginBodyStub();
}

interface typesSut {
  sut: LoginController
  validateLoginBodyStub: ValidateLoginBody
}

const makeSut = (): typesSut => {
  const validateLoginBodyStub = makeValidateLoginBodyStub();
  const sut = new LoginController(validateLoginBodyStub);

  return {
    sut,
    validateLoginBodyStub
  }
}

describe("LoginController", () => {
  it("Should call ValidateLoginBody with correct values", async () => {
    const { sut, validateLoginBodyStub } = makeSut();

    const validSpy = vi.spyOn(validateLoginBodyStub, "validate");
    await sut.handle(httpRequestStub);

    expect(validSpy).toHaveBeenCalledWith(httpRequestStub.body);
  })
})
