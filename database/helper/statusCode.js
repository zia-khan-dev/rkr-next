export const HttpStatus = {
    OK: {
      code: 200,
      message: "FETCH SUCCESSFULLY",
    },
    CREATED: {
      code: 201,
      message: "CREATED SUCCESSFULLY",
    },
  
    UPDATED: {
      code: 201,
      message: "UPDATED SUCCESSFULLY",
    },
  
    DELETED: {
      code: 204,
      message: "DELETED SUCCESSFULLY",
    },
    ACCEPTED: {
      code: 202,
      message: "ACCEPTED",
    },
    BAD_REQUEST: {
      code: 400,
      message: "BAD_REQUEST",
    },
    UNAUTHORIZED: {
      code: 401,
      message: "UNAUTHORIZED",
    },
    FORBIDDEN: {
      code: 403,
      message: "FORBIDDEN",
    },
    NOT_FOUND: {
      code: 404,
      message: "NOT FOUND",
    },
    ROUTE_NOT_FOUND: {
      code: 404,
      message: "ROUTE_NOT_FOUND",
    },
    METHOD_NOT_ALLOWED: {
      code: 405,
      message: "METHOD NOT ALLOWED",
    },
    TOO_MANY_REQUESTS: {
      code: 429,
      message: "TOO MANY REQUESTS",
    },
    INTERNAL_SERVER_ERROR: {
      code: 500,
      message: "INTERNAL_SERVER_ERROR",
    },
    NOT_IMPLEMENTED: {
      code: 501,
      message: "NOT IMPLEMENTED",
    },
    BAD_GATEWAY: {
      code: 502,
      message: "BAD GATEWAY",
    },
    SERVICE_UNAVAILABLE: {
      code: 503,
      message: "SERVICE UNAVAILABLE",
    },
    GATEWAY_TIMEOUT: {
      code: 504,
      message: "GATEWAY TIMEOUT",
    },
  };
  
  export const CustomMessages = {
    MESSAGE: {
      loginSuccess: "LOGIN SUCCESSFULLY",
      loginInValid: "LOGIN FAILED",
      inValid: "INVALID",
      emailPasswordNotFound: "EMAIL OR PASSWORD NOT FOUND",
      alreadyExist: "ALREADY EXIST",
      errorHashingPassword: "ERROR HASHING THE PASSWORD",
    },
  };
  