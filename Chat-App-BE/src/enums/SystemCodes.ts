//RG - registration
//GN - general codes


export enum GeneralCodes {
    GENERAL_ERROR = "gn",
    OK = "",
}

export enum LoginCodes {
    ERROR_WRONG_EMAIL_OR_PASSWORD = "lg1",
    ERROR_COULD_NOT_LOGIN = "lg",
}



export enum RegisterCodes {
    ERROR_EMAIL_EXISTS = "rg1",
    ERROR_USER_NAME_EXISTS = "rg2",
    ERROR_PASSWORDS_DO_NOT_MATCH = "rg3",
    ERROR_PASSWORDS_PATTERN = "rg4",
    ERROR_EMAIL_PATTERN = "rg5",
    ERROR_COULD_NOT_CREATE_USER = "rg",
}

export enum PostCodes {
    ERROR_COULD_NOT_CREATE_POST = "ps",
    ERROR_COULD_NOT_GET_POSTS = "ps1",
    ERROR_COULD_NOT_GET_POST = "ps2",
    ERROR_COULD_NOT_UPDATE_POST = "ps3",
    ERROR_COULD_NOT_DELETE_POST = "ps4",
    ERROR_COULD_NOT_LIKE_POST = "ps5",
    ERROR_COULD_NOT_UNLIKE_POST = "ps6",
    ERROR_COULD_NOT_COMMENT_POST = "ps7",
    ERROR_COULD_NOT_DELETE_COMMENT = "ps8",
    ERROR_COULD_NOT_GET_COMMENTS = "ps9",
    ERROR_MISSING_PARAMETERS = "ps10",
    ERROR_COULD_NOT_FETCH_POSTS = "ps11",
}
