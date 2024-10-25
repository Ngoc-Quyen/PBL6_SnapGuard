import axios from 'axios';
import Post from '../post/Post';
import './posts.scss';
import { useEffect, useState } from 'react';

const Posts = ({ linkAPI, ...props }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const [posts, setPosts] = useState([]);
    const storedToken = localStorage.getItem('token');

    //TEMPORARY
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/${linkAPI}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
                setPosts(response.data.posts); // Assume response.data contains the posts array
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [API_ENDPOINT]);
    return (
        <div className="posts">{posts.length > 0 && posts.map((post) => <Post post={post} key={post.post_id} />)}</div>
    );
};

export default Posts;
