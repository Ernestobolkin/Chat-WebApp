
import React, { useEffect } from 'react';
import usePostStore from '../../stores/postStore';
import PostCreationComponent from './post-create';
import { generalRequest } from '../../service/api-service';


const PostListComponent: React.FC = () => {
    const posts = usePostStore((state: any) => state.posts);
    const setPosts = usePostStore((state: any) => state.setPosts); // Import the setPosts action

    useEffect(() => {
        fetchPosts();
    },[])


    const fetchPosts = async () => {
        const response = await generalRequest('posts', 'GET');
        setPosts(response);
    }

    return (
        <div>
            <div>
                <PostCreationComponent />
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