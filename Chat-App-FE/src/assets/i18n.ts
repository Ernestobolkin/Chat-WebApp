export enum RegisterErrors {
    NAME_ERROR = "First name must be at least 2 characters long",
    NAME_REGEX_ERROR = "First name must contain only letters",
    LAST_NAME_ERROR = "Last name must be at least 2 characters long",
    LAST_NAME_REGEX_ERROR = "Last name must contain only letters",
    EMAIL_ERROR = "Email must be valid",
    PASSWORD_ERROR = "Password must be at least 8 characters long, contain at least one letter, one number and one special character",
    CONFIRM_PASSWORD_ERROR = "Passwords must match",
}

export enum generalErrors {
    EMPTY_FIELD = "Field cannot be empty",
    FORM_ERROR = "Form is not valid",
}