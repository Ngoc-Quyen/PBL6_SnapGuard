import axios from 'axios';
import React from 'react';
import './post.scss';

const ModalDelete = ({ onClose, postId, onDeleteSuccess }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const closeModal = () => {
        onClose();
    };
    const handelDelete = async () => {
        try {
            // Gọi API
            const response = await axios.delete(`${API_ENDPOINT}/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            if (response.status === 200) {
                onDeleteSuccess();
                // Đóng modal sau khi xóa
                onClose();
            } else {
                // Xử lý khi có lỗi (ví dụ: không phải status 200)
                console.error('Có lỗi xảy ra khi xóa bài viết.');
            }
        } catch (error) {
            // Xử lý lỗi kết nối hoặc lỗi từ server
            console.error('Lỗi kết nối:', error);
        }
    };
    return (
        <div>
            <div className="modal-overlay">
                <div className="modal">
                    <div className="title-top">
                        <label className="title" htmlFor="">
                            Xóa bài viết?
                        </label>
                        <button className="close-button" onClick={closeModal}>
                            <i class="fas fa-times-circle"></i>
                        </button>
                    </div>
                    <div className="content">
                        Bạn có chắc chắn muốn xóa bài viết? Nếu bạn xóa bài viết bạn bè của bạn sẽ không nhìn thấy được
                        bài viết này nữa!
                    </div>
                    <div className="btn">
                        <div className="btn-item btn-cancel" onClick={closeModal}>
                            Hủy
                        </div>
                        <div className="btn-item btn-delete" onClick={handelDelete}>
                            Xóa
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;
