import create from 'zustand';

const usePostStore = create((set) => ({
  posts: [],
  addPost: (newPost) => set((state) => ({ posts: [...state.posts, newPost] })),
  setPosts: (newPosts) => set({ posts: newPosts }),
}));

export default usePostStore;