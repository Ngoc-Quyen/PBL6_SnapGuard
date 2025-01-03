import './post.scss';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useContext, useEffect, useState } from 'react';
import { calculateTimeDifference } from '../../utils/calculateTimeDifference ';
import ModalPost from './ModalPost';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import PostDetail from './PostDetail';
import { statusPost } from '../../utils/status';

const Post = ({ post, onDeleteSuccess }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const { currentUser } = useContext(AuthContext);
    const [commentOpen, setCommentOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [comment_count, setCommentCount] = useState(post.comment_count);
    const [like_count, setLikeCount] = useState(post.like_count);
    const [liked, setLiked] = useState(false);
    const [showPostDetail, setShowPostDetail] = useState(false);
    const closeModalPost = () => {
        setOpenModal(!openModal); // Đóng ModalPost khi cần
    };
    const ShowPostDetail = () => {
        setShowPostDetail(true);
    };
    const CloseModalPostDetail = () => {
        setShowPostDetail(false);
    };
    const ShowComment = () => {
        setCommentOpen(true);
        setShowPostDetail(true);
    };
    const CloseComment = () => {
        setCommentOpen(false);
        setShowPostDetail(false);
    };

    const onLike = async () => {
        const response = await axios.get(`${API_ENDPOINT}/posts/${post.post_id}/likes`, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        const listUserLike = response.data.users;
        setLikeCount(response.data.users.length);
        listUserLike.forEach((user) => {
            if (user.username === currentUser.username) {
                setLiked(true);
            }
        });
    };

    const clickLike = async () => {
        const response = await axios.post(`${API_ENDPOINT}/posts/${post.post_id}/like`, null, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setLikeCount(response.data.like_count);
    };

    const handleClickLiked = () => {
        setLiked(!liked);
        clickLike();
    };

    const timeDifference = calculateTimeDifference(post.created_at);

    useEffect(() => {
        onLike();
    }, [showPostDetail]);

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.user.avatar_url} alt="" />
                        <div className="details">
                            <Link to={`/${post.user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className="name">{post.user.full_name}</span>
                            </Link>
                            <div className="info-post" onClick={ShowPostDetail}>
                                <span className="time">{timeDifference}</span>
                                <i
                                    className={`fas ${
                                        statusPost.find((status) => status.accessModifier === post.access_modifier)
                                            ?.classIcon || ''
                                    }`}
                                ></i>
                            </div>
                        </div>
                    </div>
                    {post.user.id === currentUser.id && (
                        <div
                            className="btn-menu"
                            onClick={() => {
                                setOpenModal(!openModal);
                            }}
                        >
                            <i className="fas fa-ellipsis-h font-size-18"></i>
                        </div>
                    )}

                    {openModal && <ModalPost post={post} onClose={closeModalPost} onDeleteSuccess={onDeleteSuccess} />}
                    {showPostDetail && (
                        <PostDetail
                            post={post}
                            closeModal={CloseModalPostDetail}
                            showPostDetail={showPostDetail}
                            setCommentCountPost={setCommentCount}
                            comment_countPost={comment_count}
                        />
                    )}
                    {commentOpen && (
                        <PostDetail
                            post={post}
                            closeModal={CloseComment}
                            showPostDetail={showPostDetail}
                            setCommentCountPost={setCommentCount}
                            comment_countPost={comment_count}
                        />
                    )}
                </div>
                <div className="content">
                    <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                    <img src={post.image_url} alt="" />
                </div>
                <div className="info">
                    <div className="item" onClick={handleClickLiked}>
                        {liked ? (
                            <i className="fas fa-heart font-size-18" style={{ color: 'red' }}></i>
                        ) : (
                            <i className="far fa-heart font-size-18"></i>
                        )}
                        {like_count} Likes
                    </div>
                    <div className="item" onClick={() => ShowComment()}>
                        <i className="fas fa-comments font-size-18"></i>
                        {comment_count} Comments
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
