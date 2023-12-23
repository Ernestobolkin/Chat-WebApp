import create from 'zustand';

interface AuthStoreState {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

interface UserDataStoreState {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    fullName: string;
  },
  setUserData: (userData: any) => void;
}

const useAuthStore = create<AuthStoreState>((set) => ({
  isSignedIn: false,
  signIn: () => set({ isSignedIn: true }),
  signOut: () => set({ isSignedIn: false }),
}));


const useUserDataStore = create<UserDataStoreState>((set) => ({
  userData: {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    fullName: '',
  },
  
  setUserData: (userData: any) => set({ userData }),
}));

export {
  useAuthStore,
  useUserDataStore
};
export type { AuthStoreState };