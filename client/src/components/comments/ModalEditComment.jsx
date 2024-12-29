import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ModalEditComment = ({ comment, onClose, getListComment, setListComments }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const [content, setContent] = useState(comment.content);
    const [previewImage, setPreviewImage] = useState(comment.image_url);
    const [image, setImage] = useState(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
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
    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Đặt lại chiều cao ban đầu
            textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // Cập nhật chiều cao tối đa là 300px
        }
    };

    const handleSendComment = async () => {
        if (content.trim() || image) {
            try {
                const formData = new FormData(); // Tạo FormData để gửi file
                formData.append('content', content); // Thêm nội dung bình luận
                if (image) {
                    formData.append('image', image); // Thêm file ảnh vào FormData
                }

                const response = await axios.put(`${API_ENDPOINT}/posts/comments/${comment.comment_id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        'Content-Type': 'multipart/form-data', // Đặt header cho FormData
                    },
                });

                if (response.status === 201 || response.status === 200) {
                    console.log('Cập nhật Bình luận thành công!');
                    const updatedComments = await getListComment(comment.postId);
                    setListComments(updatedComments); // Cập nhật lại danh sách bình luận
                }
                onClose();
            } catch (error) {
                console.error('Error:', error.response?.data || error.message);
                alert('Có lỗi xảy ra khi bình luận. Vui lòng thử lại.');
            }
        } else {
            alert('Vui lòng nhập bình luận hoặc chọn ảnh!');
        }
    };
    return (
        <div className="modal-edit">
            <div
                className="write"
                style={{
                    display: 'block',
                }}
            >
                <div className="write-content">
                    <div className="write-input">
                        {/* <input type="text" placeholder={`Bình luận dưới tên là ${user.full_name}`} /> */}
                        <textarea
                            ref={textareaRef}
                            className="input-textarea"
                            onInput={handleInput}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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
                <div className="btn-cancel" onClick={onClose}>
                    Hủy
                </div>
            </div>
        </div>
    );
};

export default ModalEditComment;
