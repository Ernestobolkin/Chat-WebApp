import axios from "axios";
import environment from "../config";

// interface Response {
//     data: any;
//     status: number;
//     code?: number;
// }

// interface Error {
//     message: string;
//     code: number;
// }

interface User {
    userName: string;
    passWord: string;
}

export const loginRequest = async( userData:User ) => {
    try{
        const response = await generalRequest("login", "POST", userData);
        if(response && response.data){
            localStorage.setItem("token", response.data.token);
        }
    }catch(error){
        console.log(error)
    }
}

export const generalRequest = async (url: string, method: string, body?: any) => {
    const api = `${environment.API_URL}/${url}`;
    try {
       switch (method) { 
            case "GET":
               {
                    const response = await axios.get(api, { headers: getHeaders() });
                    return response.data;
               }
            case "POST":
               {
                    const response = await axios.post(api, body, { headers: getHeaders() });
                    return response;
               }
            case "PUT":
               {
                    const response = await axios.put(api, body, { headers: getHeaders() });
                    return response;
               }
            case "DELETE":
               {
                    const response = await axios.delete(api, { headers: getHeaders() });
                    return response;
               }
            default:
       }
    } catch (error) {
        return error;
    }
};

const getHeaders = () => {
    let headers = {}
    const token = localStorage.getItem("token");
    if(token){
        headers = {
            Authorization: `Bearer ${token}`,
        };
    }
    return headers;
}