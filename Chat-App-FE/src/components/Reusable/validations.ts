

export const validateEmail = (email: string): boolean => {
    const re = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    return re.test(email);
}



export const validatePassword = (password: string): boolean => {
    const re =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?& ]{8,}$/;
    return re.test(password)
}


export const validateNameAndlastName = (name: string): boolean => {
    const re = new RegExp("^[a-zA-Z]{2,}$")
    return re.test(name)
}

