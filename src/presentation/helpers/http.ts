import { NotFoundError, ServerError } from "../errors";
import { HttpResponse } from "../protocols/http";

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: new NotFoundError()
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const ok = (body: any): HttpResponse => ({
    statusCode: 200,
    body
})