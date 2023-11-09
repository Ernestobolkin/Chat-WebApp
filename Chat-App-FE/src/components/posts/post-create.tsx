import React, { useState } from 'react';
import { PostCreationProps } from '../../Interfaces/Reusable';


const PostCreationComponent: React.FC<PostCreationProps> = ({ socket }) => {

  const [newPostText, setNewPostText] = useState('');

    const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostText.trim() !== '') {
      // Emit a "createPost" event with the new post data
      socket.emit('createPost', { textContent: newPostText });
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