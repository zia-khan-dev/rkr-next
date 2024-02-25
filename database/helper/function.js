import { HttpStatus } from "./statusCode";

export const validationHandler = (res, error) => {
    console.log(error);
    return res.status(HttpStatus.BAD_REQUEST.code).json({
        success: false,
        message: error?.errors?.map(e => e.message)
    })
}
