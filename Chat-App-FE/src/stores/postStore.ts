import create from 'zustand';

const usePostStore = create((set) => ({
  posts: [],
  addPost: (newPost) => set((state) => ({ posts: [...state.posts, newPost] })),
}));

export default usePostStore;