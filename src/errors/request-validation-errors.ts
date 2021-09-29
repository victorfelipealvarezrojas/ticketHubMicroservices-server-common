import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

//implementacion personalizada de error
export class RequestValidationError extends CustomError {
    statusCode: number = 400;
    constructor(public errors: ValidationError[]) {
        super("Invalid request parameters");
        //lo hago xq estoy extendiendo de otra clase
        Object.setPrototypeOf(this, RequestValidationError.prototype);//solo xq extiendo de una clase incorporada
    }

    serializeErrors() {
        return this.errors.map(error => {
            return {
                message: error.msg,
                field: error.param,
            }
        });
    }
}
