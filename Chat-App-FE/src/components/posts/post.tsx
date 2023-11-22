
import React, { useEffect } from 'react';
import usePostStore from '../../stores/postStore';
import PostCreationComponent from './post-create';
import { generalRequest } from '../../service/api-service';
import "./post.style.css";

const PostListComponent: React.FC = () => {
    const posts = usePostStore((state: any) => state.posts);
    const setPosts = usePostStore((state: any) => state.setPosts); // Import the setPosts action

    useEffect(() => {
        fetchPosts();
    }, [])


    const fetchPosts = async () => {
        const response = await generalRequest('posts', 'GET');
        setPosts(response);
    }

    const handleLike = async (postId: string) => {
        console.log(postId)
        const response = await generalRequest(`posts/${postId}/like`, 'POST');
        if (response?.message && !response.data) {
            return alert(response.message); // TODO add a toast 
        }
        setPosts(response);
    }

    return (
        <div>
            <div>
                <PostCreationComponent />
            </div>
            <div className="row">
                {posts.map((post, index) => (
                    <div className="col-md-4 mb-4 card-container" key={index}>
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-header">
                                <h5 className="card-title">
                                    <a href="#" className="font-weight-bold">
                                        {post?.author?.username}
                                    </a>
                                    <div className="user-icon"></div>
                                </h5>
                            </div>
                            {post?.image && (
                                <div className="details-container">
                                    {post.imageUrl && (
                                        <img src={post?.imageUrl} className="card-img-top" alt="User Post" />
                                    )}
                                </div>
                            )}
                            <div className="card-body">
                                <div className="details-container">
                                    <p className="card-text">{post.textContent}</p>
                                </div>
                                {/* Add comment count and link */}
                            </div>
                            <div className="card-footer">
                            <a href="#" className="comments-link">
                                    {post.commentsCount} Comments 
                                </a>
                                <button className="btn btn-primary" onClick={async () => handleLike(post?._id)}>Like 
                                <span className="badge badge-light">{post?.likes?.length}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostListComponent;