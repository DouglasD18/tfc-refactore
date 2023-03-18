import { describe, expect, it, vi } from "vitest";
import { LoginController } from './login';
import { ValidateLoginBody } from "../../protocols/validate-login-body";
import { Login } from "../../../domain/models/login";
import { HttpRequest } from '../../protocols/http';
import { MissingParamError } from '../../errors/missing-param-error';
import { InvalidParamError } from "../../errors";

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

  it("Should return MissingParam email error if with ValidateLoginBody returns", async () => {
    const { sut, validateLoginBodyStub } = makeSut();

    vi.spyOn(validateLoginBodyStub, "validate").mockReturnValueOnce(["MissingParam", "email"])
    const httpResponse = await sut.handle(httpRequestStub);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  })

  it("Should return MissingParam password error if with ValidateLoginBody returns", async () => {
    const { sut, validateLoginBodyStub } = makeSut();

    vi.spyOn(validateLoginBodyStub, "validate").mockReturnValueOnce(["MissingParam", "password"])
    const httpResponse = await sut.handle(httpRequestStub);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  })

  it("Should return InvalidParam email error if with ValidateLoginBody returns", async () => {
    const { sut, validateLoginBodyStub } = makeSut();

    vi.spyOn(validateLoginBodyStub, "validate").mockReturnValueOnce(["InvalidParam", "email", "Email must be a string!"])
    const httpResponse = await sut.handle(httpRequestStub);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email", "Email must be a string!"));
  })

  it("Should return InvalidParam password error if with ValidateLoginBody returns", async () => {
    const { sut, validateLoginBodyStub } = makeSut();

    vi.spyOn(validateLoginBodyStub, "validate").mockReturnValueOnce(["InvalidParam", "password", "Password must be a string with length greater than 5"])
    const httpResponse = await sut.handle(httpRequestStub);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("password", "Password must be a string with length greater than 5"));
  })
})
