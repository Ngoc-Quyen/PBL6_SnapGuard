import './post.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useState } from 'react';

const Post = ({ post }) => {
    const [commentOpen, setCommentOpen] = useState(false);

    //TEMPORARY
    const [liked, setLiked] = useState(false);
    const handelClikLiked = () => {
        setLiked(!liked);
    };

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
                            <span className="date">1 min ago</span>
                        </div>
                    </div>
                    <MoreHorizIcon />
                </div>
                <div className="content">
                    <p>{post.content}</p>
                    <img src={post.image_url} alt="" />
                </div>
                <div className="info">
                    <div className="item" onClick={handelClikLiked}>
                        {liked ? (
                            <i class="fas fa-heart font-size-18" style={{ color: 'red' }}></i>
                        ) : (
                            <i class="far fa-heart font-size-18"></i>
                        )}
                        12 Likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <i class="fas fa-comments font-size-18"></i>
                        12 Comments
                    </div>
                    <div className="item">
                        <i class="fas fa-share font-size-18"></i>
                        Share
                    </div>
                </div>
                {commentOpen && <Comments />}
            </div>
        </div>
    );
};

export default Post;
