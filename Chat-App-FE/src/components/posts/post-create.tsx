import React, { useEffect, useState } from 'react';
import usePostStore from '../../stores/postStore'; // Adjust the import path
import { generalRequest } from '../../service/api-service';
import "./post-create.style.css";
import { useUserDataStore } from '../../stores/authStore';

const PostCreationComponent: React.FC = () => {
  const [newPostText, setNewPostText] = useState('');
  const addPost = usePostStore((state: any) => state.addPost);
  const { userData } = useUserDataStore();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPostText.trim() !== '') {
      addPost({ textContent: newPostText });
      await generalRequest('posts/create', 'POST', { textContent: newPostText });
      //TODO add toast
      setNewPostText('');
    }
  };

  const getRandomPlaceholder = () => {
    const placeholders = [
      // Personalized Prompts
      `What's new in your world today, ${userData?.username}?`,
      `Share a highlight from your day, ${userData?.username}!`,
      `What's a recent discovery you've made, ${userData?.username}?`,
      `What's something you're looking forward to, ${userData?.username}?`,
      `Share a memory or story, ${userData?.username}!`,
    
      // Instructions or Guidelines
      "Remember to keep it friendly and constructive.",
      "What advice would you give on [a relevant topic]?",
      "Share insights or ask questions about [a relevant topic].",
      "What's a lesson you've learned recently?",
      "Describe a challenge you've overcome or are facing.",
    
      // Encouraging Creativity
      "Describe a place you love in vivid detail.",
      "What's an idea you've been excited about lately?",
      "Share a poem, quote, or a line from a book that's meaningful to you.",
      "What's a creative solution you've come up with recently?",
      "Imagine a perfect day - what does it look like?"
    ];
  
    
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    return placeholders[randomIndex];
  }

  return (
    <div>
      <div className="create-post-container d-flex flex-column justify-content-center align-items-sm-center">
        <div className="form-group d-flex flex-column justify-content-center">
          <form onSubmit={handlePostSubmit}>
            <textarea
              rows={4}
              cols={50}
              placeholder={getRandomPlaceholder()}
              value={newPostText}
              className='form-control'
              onChange={(e) => setNewPostText(e.target.value)}
            />
            <br />
            <button type="submit">Create Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PostCreationComponent;