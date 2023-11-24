import { useAuthStore, AuthStoreState } from "../stores/authStore";

interface userData {
    email: string;
    firstName: string;
    lastName: string;
}


export const logOut = () => {
    const { signOut }: AuthStoreState = useAuthStore.getState();
    signOut();
    removeUserData();
}


export const getJwtToken = () => {
    const token = sessionStorage.getItem("token");
    return token;
}

export const getUserData = (): Object => {
    const userDataRaw = sessionStorage.getItem("userData");
    const userData = JSON.parse(userDataRaw || '{}');
    return userData;
}

export const removeUserData = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("token");
}