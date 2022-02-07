import CustomError, { ErrorType } from "../CustomError";

export default class InvalidParamenterError extends CustomError {
    static type = 'InvalidParamenterError' as ErrorType
}