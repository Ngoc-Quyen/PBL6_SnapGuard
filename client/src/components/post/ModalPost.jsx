import React, { useState } from 'react';
import './post.scss';
import ModalDelete from './ModalDelete';

const ModalPost = ({ post, onClose, onDeleteSuccess }) => {
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const openModalDeleteHandler = () => {
        setOpenModalDelete(true); // Mở ModalDelete và ẩn ModalPost
    };

    const closeModalDelete = () => {
        setOpenModalDelete(false); // Đóng ModalDelete và hiển thị lại ModalPost
    };
    return (
        <div className="modal-post">
            {!openModalDelete && (
                <ul className="list-btn">
                    <li className="btn-item">
                        <i className="far fa-edit"></i>
                        <span>Chỉnh sửa bài viết</span>
                    </li>
                    <li
                        className="btn-item"
                        onClick={openModalDeleteHandler} // Mở ModalDelete khi nhấn nút xóa
                    >
                        <i className="fas fa-trash"></i>
                        <span>Xóa bài viết</span>
                    </li>
                </ul>
            )}
            {openModalDelete && (
                <ModalDelete onClose={closeModalDelete} postId={post.post_id} onDeleteSuccess={onDeleteSuccess} />
            )}
        </div>
    );
};

export default ModalPost;
