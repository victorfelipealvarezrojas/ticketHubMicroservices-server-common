import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";//aqui implemento la clase abtracta y no los concretas que la utilizan


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
        errors: err.serializeErrors()
      });
  }


  //en caso de un erro que no controlen las dos opciones anteriores
  res.status(400).send({
    errors: [{
      message: "something went wrong"
    }],
  });
};
