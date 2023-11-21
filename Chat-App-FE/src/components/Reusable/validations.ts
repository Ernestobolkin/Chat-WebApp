

export const validateEmail = (email: string): boolean => {
    const re = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    return re.test(email);
}