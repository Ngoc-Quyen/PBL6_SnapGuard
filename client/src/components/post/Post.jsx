import './post.scss';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useContext, useEffect, useState } from 'react';
import { calculateTimeDifference } from '../../utils/calculateTimeDifference ';
import ModalPost from './ModalPost';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const Post = ({ post, onDeleteSuccess }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const { currentUser } = useContext(AuthContext);
    const [commentOpen, setCommentOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [comment_count, setCommentCount] = useState(post.comment_count);
    const [like_count, setLikeCount] = useState(post.like_count);

    const closeModalPost = () => {
        setOpenModal(!openModal); // Đóng ModalPost khi cần
    };
    const [liked, setLiked] = useState(false);

    const onLike = async () => {
        const response = await axios.get(`${API_ENDPOINT}/posts/${post.post_id}/likes`, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        const listUserLike = response.data.users;
        listUserLike.map((user) => {
            if (user.username === currentUser.username) {
                setLiked(true);
            }
        });
    };
    const clickLike = async () => {
        const response = await axios.post(`${API_ENDPOINT}/posts/${post.post_id}/like`, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setLikeCount(response.data.like_count);
    };
    const handelClikLiked = () => {
        setLiked(!liked);
        clickLike();
    };
    const timeDifference = calculateTimeDifference(post.created_at);
    useEffect(() => {
        onLike();
    }, [post]);
    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.user.avatar_url} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className="name">{post.user.full_name}</span>
                            </Link>
                            <span className="date">{timeDifference}</span>
                            <span className="date">{timeDifference}</span>
                        </div>
                    </div>
                    <div
                        className="btn-menu"
                        onClick={() => {
                            setOpenModal(!openModal);
                        }}
                    >
                        <i class="fas fa-ellipsis-h font-size-18"></i>
                    </div>
                    {openModal && <ModalPost post={post} onClose={closeModalPost} onDeleteSuccess={onDeleteSuccess} />}
                    <div
                        className="btn-menu"
                        onClick={() => {
                            setOpenModal(!openModal);
                        }}
                    >
                        <i class="fas fa-ellipsis-h font-size-18"></i>
                    </div>
                    {openModal && <ModalPost post={post} onClose={closeModalPost} onDeleteSuccess={onDeleteSuccess} />}
                </div>
                <div className="content">
                    <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                    <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                    <img src={post.image_url} alt="" />
                </div>
                <div className="info">
                    <div className="item" onClick={handelClikLiked}>
                        {liked ? (
                            <i class="fas fa-heart font-size-18" style={{ color: 'red' }}></i>
                        ) : (
                            <i class="far fa-heart font-size-18"></i>
                        )}
                        {like_count} Likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <i class="fas fa-comments font-size-18"></i>
                        {comment_count} Comments
                    </div>
                    <div className="item">
                        <i class="fas fa-share font-size-18"></i>
                        Share
                    </div>
                </div>
                {commentOpen && (
                    <Comments comments={post.comments} postId={post.post_id} setCommentCount={setCommentCount} />
                )}
            </div>
        </div>
    );
};

export default Post;
