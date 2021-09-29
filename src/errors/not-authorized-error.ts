import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode: number = 401;
    reason: string = "Not Authorized";

    constructor() {
        super("Route not found");
        //lo hago xq estoy extendiendo de otra clase
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);//solo xq extiendo de una clase incorporada
    }

    serializeErrors() {
        return [{
            message: this.reason
        }]
    }
}