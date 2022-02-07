export const ERRORS = {
    FORBIDDEN: "http://reviva.com.br/forbidden",
    INVALID_DATA: "http://reviva.com.br/invalid-data",
    SYSTEM_ERROR: "http://reviva.com.br/system-error",
    INVALID_PARAMETER: "http://reviva.com.br/invalid-parameter",
    INCOMPREHENSIBLE_MESSAGE: "http://reviva.com.br/incomprehensible-message",
    RESOURCE_NOT_FOUND: "http://reviva.com.br/resource-not-found",
    BUSINESS_ERROR: "http://reviva.com.br/business-error",
};

export { default as ForbiddenError } from "./Forbidden.error";
export { default as InvalidDataError } from "./InvalidData.error";
export { default as InvalidParamenterError } from "./InvalidParamenter.error";
export { default as SystemError } from "./System.error";
export { default as ResourceNotFoundError } from "./ResourceNotFound.error";
export { default as BusinessError } from "./Business.error";
export { default as GenericError } from "./Generic.error";
export { default as IncomprehensibleMessageError } from "./IncomprehensibleMessage.error";