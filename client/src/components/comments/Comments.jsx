import { useContext, useEffect, useRef, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import useNode from '../../hooks/useNode';
import { calculateTimeDifference } from '../../utils/calculateTimeDifference ';
import axios from 'axios';
import ModalEditComment from './ModalEditComment';

const Comments = ({ comments, postId, setCommentCount }) => {
    const { currentUser } = useContext(AuthContext);
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const [listComments, setListComments] = useState(comments || []);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Đặt lại chiều cao ban đầu
            textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // Cập nhật chiều cao tối đa là 300px
        }
    };
    const handleIconClick = () => {
        // Kích hoạt input file khi bấm vào icon
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); // Lưu ảnh vào state
            setPreviewImage(URL.createObjectURL(file)); // Tạo URL tạm thời để xem trước ảnh
        }
    };
    // Hàm để gọi API lấy danh sách comment
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

                const response = await axios.post(`${API_ENDPOINT}/posts/${postId}/comments`, formData, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        'Content-Type': 'multipart/form-data', // Đặt header cho FormData
                    },
                });

                if (response.status === 201 || response.status === 200) {
                    console.log('Bình luận thành công!');
                }
                const updatedComments = await getListComment(postId);
                setListComments(updatedComments);
                // Reset form sau khi gửi
                setComment('');
                setImage(null);
                setPreviewImage(null);
                fileInputRef.current.value = null;

                setCommentCount(updatedComments.length);
            } catch (error) {
                console.error('Error:', error.response?.data || error.message);
                alert('Có lỗi xảy ra khi bình luận. Vui lòng thử lại.');
            }
        } else {
            alert('Vui lòng nhập bình luận hoặc chọn ảnh!');
        }
    };

    // Khởi tạo một đối tượng để lưu trạng thái liked theo id của comment
    const [likedComments, setLikedComments] = useState({});

    const handleClickLiked = (id) => {
        setLikedComments((prevLikedComments) => ({
            ...prevLikedComments,
            [id]: !prevLikedComments[id], // Đổi trạng thái like của comment có id tương ứng
        }));
    };

    const [isImageOpen, setIsImageOpen] = useState(false);

    // Hàm xử lý mở/đóng ảnh
    const handleImageClick = () => {
        setIsImageOpen(!isImageOpen);
    };
    const [isModalVisible, setModalVisible] = useState({});

    // Hàm toggle để hiển thị/ẩn modal
    const toggleModal = (id) => {
        setModalVisible((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Đổi trạng thái like của comment có id tương ứng
        }));
    };

    const handleDeleteComment = async (id) => {
        try {
            const response = await axios.delete(`${API_ENDPOINT}/posts//comments/${id}`, {
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
    const handleCloseModal = (id) => {
        setShowModalEdit((prevState) => ({
            ...prevState,
            [id]: false,
        }));
    };

    useEffect(() => {
        // Tạo một hàm async trong useEffect
        const fetchComments = async () => {
            try {
                const updatedComments = await getListComment(postId);
                setListComments(updatedComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);
    return (
        <div className="comments">
            <div className="write">
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
            {Array.isArray(listComments) &&
                listComments.map((comment) => (
                    <div className="comment">
                        <div className="comment-content">
                            <img src={comment.user.avatar_url} alt="" />
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
                                            getListComment={() => getListComment(postId)}
                                            setListComments={setListComments} // Truyền hàm cập nhật state
                                        />
                                    )}

                                    <div
                                        className="btn-menu"
                                        onClick={() => toggleModal(comment.comment_id)}
                                        style={{
                                            display: showModalEdit[comment.comment_id] ? 'none' : 'flex',
                                        }}
                                    >
                                        <i class="fas fa-ellipsis-h"></i>
                                    </div>
                                    {isModalVisible[comment.comment_id] && comment.user.id === currentUser.id && (
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
                            <div className="item" onClick={() => handleClickLiked(comment.comment_id)}>
                                {likedComments[comment.comment_id] ? (
                                    <i className="fas fa-heart font-size-18" style={{ color: 'red' }}></i>
                                ) : (
                                    <i className="far fa-heart font-size-18"></i>
                                )}
                            </div>
                            <div className="btn-comment">
                                <i class="fas fa-comment-dots"></i>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Comments;
