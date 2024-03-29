import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: S }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

export const formatJSONResponse = {
  _200: (response) => ({
    statusCode: 200,
    headers,
    body: JSON.stringify(response)
  }),
  _201: (response) => ({
    statusCode: 201,
    headers,
    body: JSON.stringify(response)
  }),
  _400: (message: string) => ({
    statusCode: 400,
    headers,
    body: message
  }),
  _404: (message?: string): APIGatewayProxyResult => ({
    statusCode: 404,
    headers,
    body: JSON.stringify({message: message ?? 'Not found'})
  }),
  _500: (error: unknown) => ({
    statusCode: 500,
    headers,
    body: JSON.stringify(error ?? {message: 'Internal server error'})
  })
}
