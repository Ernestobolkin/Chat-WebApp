import React, { useState } from 'react';
import usePostStore from '../../stores/postStore'; // Adjust the import path
import { generalRequest } from '../../service/api-service';

const PostCreationComponent: React.FC = () => {
  const [newPostText, setNewPostText] = useState('');
  const addPost = usePostStore((state:any) => state.addPost);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPostText.trim() !== '') {
      addPost({ textContent: newPostText });
      await generalRequest('posts/create', 'POST', { textContent: newPostText });
      //TODO add toast
      setNewPostText('');
    }
  };

  return (
    <div>
      <h2>Create a Post</h2>
      <form onSubmit={handlePostSubmit}>
        <textarea
          rows={4}
          cols={50}
          placeholder="Write your post..."
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />
        <br />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default PostCreationComponent;