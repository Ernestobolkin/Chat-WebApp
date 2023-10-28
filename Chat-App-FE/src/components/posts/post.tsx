
import React from 'react';
import usePostStore from '../../stores/postStore';
import PostCreationComponent from './post-create';

const PostListComponent: React.FC = () => {
    const posts = usePostStore((state: any) => state.posts);

    return (
        <div>
            <div>
                <PostCreationComponent />
            </div>
            <h2>Posts</h2>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>{post.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default PostListComponent;