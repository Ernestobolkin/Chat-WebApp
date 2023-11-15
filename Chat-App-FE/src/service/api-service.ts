import axios from "axios";
import environment from "../config";
import { User } from "../Interfaces/Reusable";
import { logOut } from "./auth-service";

export const loginRequest = async( userData:User ) => {
    try{
        const response = await generalRequest("login", "POST", userData);
        if(response && !response?.data?.code){
            sessionStorage.setItem("token", response.token);
            return response.user;
        }
        return false
    }catch(error){
        console.log(error)
        return false
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
                    return response?.data;
               }
            case "PUT":
               {
                    const response = await axios.put(api, body, { headers: getHeaders() });
                    return response?.data;
               }
            case "DELETE":
               {
                    const response = await axios.delete(api, { headers: getHeaders() });
                    return response?.data;
               }
            default:
       }
    } catch (error:any) {
        const responseError = error?.response;
        const url = responseError?.config?.url;
        if(
            !url.includes("register") && 
            !url.includes("login") && 
            (responseError && responseError.status === 403 || 
            responseError.data.message === "Unauthorized" ||
            responseError.status === 401)
            ){
            sessionStorage.removeItem("token");
            window.location.href = "/login";
            logOut();
        }
        return responseError;
    }
};

const getHeaders = () => {
    let headers = {}
    const token = sessionStorage.getItem("token");
    if(token){
        headers = {
            Authorization: `Bearer ${token}`,
        };
    }
    return headers;
}