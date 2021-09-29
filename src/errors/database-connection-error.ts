import { CustomError } from "./custom-error";

//implementacion personalizada de error
export class DatabaseConnectonError extends CustomError {
    statusCode: number = 500;
    reason: string = "Error connecting to database";
    constructor() {
        super("Error connecting to database");
        //lo hago xq estoy extendiendo de otra clase
        Object.setPrototypeOf(this, DatabaseConnectonError.prototype); //solo xq extiendo de una clase incorporada
    }

    serializeErrors() {
        return [{
            message: this.reason
        }]
    }
}
