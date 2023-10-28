import create from 'zustand';

interface AuthStoreState {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

const useAuthStore = create<AuthStoreState>((set) => ({
  isSignedIn: false,
  signIn: () => set({ isSignedIn: true }),
  signOut: () => set({ isSignedIn: false }),
}));

export default useAuthStore;
export type { AuthStoreState };