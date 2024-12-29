import './post.scss';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { calculateTimeDifference } from '../../utils/calculateTimeDifference ';
import ModalPost from './ModalPost';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { statusPost } from '../../utils/status';
import ModalEditComment from '../comments/ModalEditComment';

const PostDetail = ({ post, closeModal, showPostDetail, setCommentCountPost, comment_countPost }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const { currentUser } = useContext(AuthContext);
    const [commentOpen, setCommentOpen] = useState(false);
    const [comment_count, setCommentCount] = useState(comment_countPost);
    const [like_count, setLikeCount] = useState(post.like_count);
    const [liked, setLiked] = useState(false);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [listComments, setListComments] = useState([]);
    const [isModalVisible, setModalVisible] = useState({});
    const [likedComments, setLikedComments] = useState({});
    const [showReplies, setShowReplies] = useState({});

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

    const updateListComment = async () => {
        const response = await axios.get(`${API_ENDPOINT}/posts/${post.post_id}/comments`, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        });
        setListComments(response.data);
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
    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Đặt lại chiều cao ban đầu
            textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // Cập nhật chiều cao tối đa là 300px
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); // Lưu ảnh vào state
            setPreviewImage(URL.createObjectURL(file)); // Tạo URL tạm thời để xem trước ảnh
        }
    };
    const handleIconClick = () => {
        // Kích hoạt input file khi bấm vào icon
        fileInputRef.current.click();
    };
    const handleSendComment = async () => {
        if (comment.trim() || image) {
            try {
                const formData = new FormData(); // Tạo FormData để gửi file
                formData.append('userId', currentUser.id); // Thêm userId
                formData.append('content', comment); // Thêm nội dung bình luận
                formData.append('parentCommentId', ''); // Thêm parentCommentId nếu cần
                if (image) {
                    formData.append('image', image); // Thêm file ảnh vào FormData
                }

                const response = await axios.post(`${API_ENDPOINT}/posts/${post.post_id}/comments`, formData, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        'Content-Type': 'multipart/form-data', // Đặt header cho FormData
                    },
                });

                if (response.status === 201 || response.status === 200) {
                    console.log('Bình luận thành công!');
                }
                const updatedComments = await getListComment(post.post_id);
                setListComments(updatedComments);
                // Reset form sau khi gửi
                setComment('');
                setImage(null);
                setPreviewImage(null);
                fileInputRef.current.value = null;
                const count = comment_count + 1;
                setCommentCount(count);
                setCommentCountPost(count);
            } catch (error) {
                console.error('Error:', error.response?.data || error.message);
                alert('Có lỗi xảy ra khi bình luận. Vui lòng thử lại.');
            }
        } else {
            alert('Vui lòng nhập bình luận hoặc chọn ảnh!');
        }
    };
    const [showModalEdit, setShowModalEdit] = useState({});
    const handleShowModalEdit = (id) => {
        setShowModalEdit((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
        setModalVisible((prevState) => ({
            ...prevState,
            [id]: false,
        }));
    };

    const toggleReplies = (id) => {
        console.log('🚀 ~ toggleReplies ~ id:', id);
        setShowReplies((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Đổi trạng thái hiển thị replies của commentId
        }));
        console.log('🚀 ~ toggleReplies ~ showReplies:', showReplies);
    };
    const toggleModal = (id) => {
        setModalVisible((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Đổi trạng thái like của comment có id tương ứng
        }));
    };
    const handleCloseModal = (id) => {
        setShowModalEdit((prevState) => ({
            ...prevState,
            [id]: false,
        }));
    };
    const getListComment = async (postId) => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/posts/${postId}/comments`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error('Error fetching comments:', error);
            return []; // Trả về mảng rỗng nếu có lỗi
        }
    };

    const handleDeleteComment = async (id) => {
        try {
            const response = await axios.delete(`${API_ENDPOINT}/posts/comments/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            }); // Thay đường dẫn bằng API của bạn

            if (response.status === 200) {
                // Cập nhật danh sách comments sau khi xóa
                setListComments((prevComments) => prevComments.filter((comment) => comment.comment_id !== id));
                // Cập nhật số lượng bình luận
                setCommentCount((prevCount) => prevCount - 1);

                // Ẩn modal của comment vừa xóa
                setModalVisible((prevState) => ({
                    ...prevState,
                    [id]: false,
                }));
            } else {
                console.error('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error while deleting comment:', error);
        }
    };

    useEffect(() => {
        onLike();
        updateListComment();
    }, [showPostDetail]);

    return (
        <div className="modal-post-detail">
            <div className="modal-overlay">
                <div className="modal">
                    <div className="title-top">
                        <label className="title" htmlFor="">
                            Bài viết của {post.user.full_name}
                        </label>
                        <button className="close-button" onClick={closeModal}>
                            <i class="fas fa-times-circle"></i>
                        </button>
                    </div>
                    <div className="body">
                        <div className="user-modal">
                            <div className="user-avatar">
                                <img src={post.user.avatar_url} alt="" />
                            </div>
                            <div className="info">
                                <span className="info-name">{post.user.full_name}</span>
                                <div className="info-post">
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
                        <div className="content">
                            <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                            {post.image_url && <img src={post.image_url} alt="" className="content-img" />}
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
                            <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                                <i className="fas fa-comments font-size-18"></i>
                                {comment_count} Comments
                            </div>
                        </div>
                        {Array.isArray(listComments) &&
                            listComments.map((comment) => (
                                <div className="comment" key={comment.comment_id}>
                                    <div className="comment-content">
                                        <img src={comment.user.avatar_url} alt="" className="info-img" />
                                        <div className="info">
                                            <div className="info-top">
                                                <div
                                                    className="info-content"
                                                    style={{
                                                        display: showModalEdit[comment.comment_id] ? 'none' : 'block',
                                                    }}
                                                >
                                                    <span>{comment.user.full_name}</span>
                                                    <p>{comment.content}</p>
                                                </div>
                                                {showModalEdit[comment.comment_id] && comment && (
                                                    <ModalEditComment
                                                        user={comment.user}
                                                        comment={comment}
                                                        onClose={() => handleCloseModal(comment.comment_id)}
                                                        getListComment={() => getListComment(post.post_id)}
                                                        setListComments={setListComments} // Update state
                                                    />
                                                )}

                                                <div
                                                    className="btn-menu"
                                                    onClick={() => toggleModal(comment.comment_id)}
                                                    style={{
                                                        display: showModalEdit[comment.comment_id] ? 'none' : 'flex',
                                                    }}
                                                >
                                                    <i className="fas fa-ellipsis-h"></i>
                                                </div>
                                                {isModalVisible[comment.comment_id] &&
                                                    comment.user.id === currentUser.id && (
                                                        <div className="modal-menu">
                                                            <div
                                                                className="btn btn-edit"
                                                                onClick={() => handleShowModalEdit(comment.comment_id)}
                                                            >
                                                                Chỉnh sửa
                                                            </div>
                                                            <div
                                                                className="btn btn-delete"
                                                                onClick={() => handleDeleteComment(comment.comment_id)}
                                                            >
                                                                Xóa
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>
                                            {comment.image_url && (
                                                <div
                                                    className="comment-img"
                                                    style={{
                                                        display: showModalEdit[comment.comment_id] ? 'none' : 'block',
                                                    }}
                                                >
                                                    <img src={comment.image_url} alt="" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="btn-icon"
                                        style={{
                                            display: showModalEdit[comment.comment_id] ? 'none' : 'flex',
                                        }}
                                    >
                                        <span className="date">{calculateTimeDifference(comment.created_at)}</span>
                                        {/* <div className="item" onClick={() => handleClickLiked(comment.comment_id)}>
                                            {likedComments[comment.comment_id] ? (
                                                <i className="fas fa-heart font-size-18" style={{ color: 'red' }}></i>
                                            ) : (
                                                <i className="far fa-heart font-size-18"></i>
                                            )}
                                        </div> */}
                                        <div className="btn-comment">
                                            <i className="fas fa-comment-dots"></i>
                                        </div>
                                    </div>
                                    {comment.replies.length > 0 && (
                                        <div className="showReply" onClick={() => toggleReplies(comment.comment_id)}>
                                            {showReplies[comment.comment_id]
                                                ? 'Ẩn câu trả lời'
                                                : `Xem câu trả lời (${comment.replies.length})`}
                                        </div>
                                    )}
                                    {showReplies[comment.comment_id] && (
                                        <div className="replies">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.reply_id} className="reply-item">
                                                    <div className="item-content">
                                                        <img src={reply.user.avatar_url} alt="" className="info-img" />
                                                        <div className="info">
                                                            <div className="info-top">
                                                                <div
                                                                    className="info-content"
                                                                    style={{
                                                                        display: showModalEdit[reply.reply_id]
                                                                            ? 'none'
                                                                            : 'block',
                                                                    }}
                                                                >
                                                                    <span>{reply.user.full_name}</span>
                                                                    <p>{reply.content}</p>
                                                                </div>
                                                                {showModalEdit[reply.reply_id] && reply && (
                                                                    <ModalEditComment
                                                                        user={reply.user}
                                                                        comment={reply}
                                                                        onClose={() => handleCloseModal(reply.reply_id)}
                                                                        getListComment={() =>
                                                                            getListComment(post.post_id)
                                                                        }
                                                                        setListComments={setListComments} // Update state
                                                                    />
                                                                )}

                                                                <div
                                                                    className="btn-menu"
                                                                    onClick={() => toggleModal(reply.reply_id)}
                                                                    style={{
                                                                        display: showModalEdit[reply.reply_id]
                                                                            ? 'none'
                                                                            : 'flex',
                                                                    }}
                                                                >
                                                                    <i className="fas fa-ellipsis-h"></i>
                                                                </div>
                                                                {isModalVisible[reply.reply_id] &&
                                                                    reply.user.id === currentUser.id && (
                                                                        <div className="modal-menu">
                                                                            <div
                                                                                className="btn btn-edit"
                                                                                onClick={() =>
                                                                                    handleShowModalEdit(reply.reply_id)
                                                                                }
                                                                            >
                                                                                Chỉnh sửa
                                                                            </div>
                                                                            <div
                                                                                className="btn btn-delete"
                                                                                onClick={() =>
                                                                                    handleDeleteComment(reply.reply_id)
                                                                                }
                                                                            >
                                                                                Xóa
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                            </div>
                                                            {reply.image_url && (
                                                                <div
                                                                    className="comment-img"
                                                                    style={{
                                                                        display: showModalEdit[reply.reply_id]
                                                                            ? 'none'
                                                                            : 'block',
                                                                    }}
                                                                >
                                                                    <img src={reply.image_url} alt="" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="btn-icon"
                                                        style={{
                                                            display: showModalEdit[comment.comment_id]
                                                                ? 'none'
                                                                : 'flex',
                                                        }}
                                                    >
                                                        <span className="date">
                                                            {calculateTimeDifference(comment.created_at)}
                                                        </span>
                                                        {/* <div
                                                            className="item"
                                                            onClick={() => handleClickLiked(comment.comment_id)}
                                                        >
                                                            {likedComments[comment.comment_id] ? (
                                                                <i
                                                                    className="fas fa-heart font-size-18"
                                                                    style={{ color: 'red' }}
                                                                ></i>
                                                            ) : (
                                                                <i className="far fa-heart font-size-18"></i>
                                                            )}
                                                        </div> */}
                                                        <div className="btn-comment">
                                                            <i className="fas fa-comment-dots"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                    <div className="footer">
                        <div className="write-img">
                            <img src={currentUser.avatar_url} alt="" />
                        </div>
                        <div className="write-content">
                            <div className="write-input">
                                {/* <input type="text" placeholder={`Bình luận dưới tên là ${currentUser.full_name}`} /> */}
                                <textarea
                                    ref={textareaRef}
                                    placeholder={`Bình luận dưới tên là ${currentUser.full_name}`}
                                    className="input-textarea"
                                    onInput={handleInput}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <div className="btn-icon">
                                    <div className="btn-img">
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg, image/gif"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                        {/* Icon máy ảnh */}
                                        {!previewImage && (
                                            <i
                                                className="fas fa-camera"
                                                style={{ cursor: 'pointer' }}
                                                onClick={handleIconClick}
                                            ></i>
                                        )}
                                    </div>
                                    <i
                                        className="fas fa-paper-plane"
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleSendComment}
                                    ></i>
                                </div>
                            </div>
                            {previewImage && (
                                <div className="image-preview">
                                    <img src={previewImage} alt="Ảnh đã chọn" />
                                    <i
                                        class="fas fa-times-circle"
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => {
                                            setPreviewImage(null);
                                        }}
                                    ></i>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
