export const config = {
    PORT: process.env.PORT || 3000,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING || 'mongodb+srv://elzo:XhxnvNubdu@ertodatabase.ilvau.mongodb.net/?retryWrites=true&w=majority',
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
    EMAIL_REGEX:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
}