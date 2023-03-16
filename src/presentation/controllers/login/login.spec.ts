import { describe, expect, test } from "vitest";
import { LoginController } from './login';

const makeSut = (): LoginController => {
  return new LoginController();
}

describe("LoginController", () => {
  test("Should return 400 if email is provided", async () => {
    const sut = makeSut();
    const httpRequest = {}

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  })
})
