
import React, { useEffect } from 'react';
import usePostStore from '../../stores/postStore';
import PostCreationComponent from './post-create';
import  { createServerConnection }  from '../../service/post-socket.service';

const PostListComponent: React.FC = () => {
    const posts = usePostStore((state: any) => state.posts);
    const addPost = usePostStore((state: any) => state.addPost);
    //TODO move to a service
    const socket = createServerConnection()


    socket.on('message', (data) => {
        console.log('Received message:', data);
        // Handle the received data as needed
      });

      useEffect(() => {
        // Set up a listener for the 'newPost' event
        socket.on('newPost', (newPost) => {
          // Update the store with the new post
          addPost(newPost);
        });

        return () => {
            socket.off('newPost');
          };
        }, [addPost, socket]);
  
    return (
        <div>
            <div>
                <PostCreationComponent socket={socket}/>
            </div>
            <h2>Posts</h2>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>{post.textContent}</li>
                ))}
            </ul>
        </div>
    );
}

export default PostListComponent;

