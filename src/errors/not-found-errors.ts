import { CustomError } from "./custom-error";

export class NotFounError extends CustomError {
    statusCode: number = 404;
    reason: string = "Route not found";

    constructor() {
        super("Route not found");
        //lo hago xq estoy extendiendo de otra clase
        Object.setPrototypeOf(this, NotFounError.prototype);//solo xq extiendo de una clase incorporada
    }

    serializeErrors() {
        return [{
            message: this.reason
        }]
    }
}