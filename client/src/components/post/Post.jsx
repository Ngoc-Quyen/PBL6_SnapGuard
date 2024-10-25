import './post.scss';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useState } from 'react';
import { calculateTimeDifference } from '../../utils/calculateTimeDifference ';
import ModalPost from './ModalPost';

const Post = ({ post, onDeleteSuccess }) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const closeModalPost = () => {
        setOpenModal(!openModal); // Đóng ModalPost khi cần
    };
    //TEMPORARY
    const [liked, setLiked] = useState(false);
    const handelClikLiked = () => {
        setLiked(!liked);
    };
    const timeDifference = calculateTimeDifference(post.created_at);
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
                </div>
                <div className="content">
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
                        {post.like_count} Likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <i class="fas fa-comments font-size-18"></i>
                        {post.comment_count} Comments
                    </div>
                    <div className="item">
                        <i class="fas fa-share font-size-18"></i>
                        Share
                    </div>
                </div>
                {commentOpen && <Comments comments={post.comments} postId={post.post_id} />}
            </div>
        </div>
    );
};

export default Post;
