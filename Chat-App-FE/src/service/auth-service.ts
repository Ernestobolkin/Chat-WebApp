import useAuthStore, { AuthStoreState } from "../stores/authStore";


export const logOut = () => {
    const { isSignedIn, signOut }: AuthStoreState = useAuthStore.getState();
    if (isSignedIn) {
        signOut();
    }
}


export const getJwtToken = () => {
    const token = sessionStorage.getItem("token");
    return token;
}