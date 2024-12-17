import './post.scss';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { calculateTimeDifference } from '../../utils/calculateTimeDifference ';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import PostDetail from './PostDetail';
import { statusPost } from '../../utils/status';

const PostNotifi = () => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const { currentUser } = useContext(AuthContext);
    const { id } = useParams();
    const [post, setPost] = useState();

    const [commentOpen, setCommentOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [comment_count, setCommentCount] = useState(0);
    const [like_count, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showPostDetail, setShowPostDetail] = useState(false);
    const [timeDifference, setTimeDifference] = useState('');

    const fetchPost = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/post/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            setPost(response.data);
            setCommentCount(response.data.comment_count);
            setLikeCount(response.data.like_count);
            setTimeDifference(calculateTimeDifference(response.data.created_at));
            console.log('post: ', post);
        } catch (error) {
            console.log('🚀 ~ fetchPost ~ error:', error);
        }
    };
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
        const response = await axios.get(`${API_ENDPOINT}/posts/${id}/likes`, {
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
        const response = await axios.post(`${API_ENDPOINT}/posts/${id}/like`, null, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setLikeCount(response.data.like_count);
    };

    const handleClickLiked = () => {
        setLiked(!liked);
        clickLike();
        fetchPost();
    };

    useEffect(() => {
        fetchPost();
        onLike();
    }, [id, showPostDetail]);
    if (!post) {
        return <div>Loading post...</div>;
    }
    return (
        <div className="post notifi">
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
                    <img src={post.image_url} alt="" className="content-img" />
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

export default PostNotifi;
