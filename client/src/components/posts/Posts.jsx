import axios from 'axios';
import Post from '../post/Post';
import './posts.scss';
import { useEffect, useState } from 'react';

const Posts = ({ linkAPI, refresh, ...props }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const [posts, setPosts] = useState([]);
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

    //TEMPORARY
    useEffect(() => {
        fetchPosts();
    }, [linkAPI, refresh]);
    const handleDeleteSuccess = () => {
        fetchPosts(); // Cập nhật lại danh sách bài viết khi xóa thành công
    };
    return (
        <div className="posts">
            {posts.length === 0 ? (
                <div>Không có bài viết nào.</div>
            ) : (
                posts.map((post) => <Post post={post} key={post.post_id} onDeleteSuccess={handleDeleteSuccess} />)
            )}
        </div>
    );
};

export default Posts;
