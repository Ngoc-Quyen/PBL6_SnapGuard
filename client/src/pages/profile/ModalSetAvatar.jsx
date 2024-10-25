import React, { useContext, useState } from 'react';
import './profile.scss';
import Select from 'react-select';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const ModalSetAvata = ({ user, onClose }) => {
    const fileInputRef = React.useRef(null);
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const { updateAvatar } = useContext(AuthContext);
    const [imageSrc, setImageSrc] = useState(user.avatar_url);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleIconClick = () => {
        // Mở input file khi nhấp vào biểu tượng
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const closeModal = () => {
        onClose();
    };
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result); // Cập nhật ảnh mới
                setSelectedFile(file);
            };
            reader.readAsDataURL(file); // Đọc file dưới dạng URL
        }
    };
    const handleSave = async () => {
        if (!selectedFile) {
            alert('Chọn ảnh để lưu!');
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.put(`${API_ENDPOINT}/user/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                    'Content-Type': 'multipart/form-data', // Đặt header cho FormData
                },
            });

            if (response.status === 200) {
                alert('Lưu ảnh thành công!');
                updateAvatar(response.data.user.avatar_url); // Cập nhật trong AuthContext
                onClose(); // Đóng modal khi thành công
            }
        } catch (error) {
            console.error('Lỗi khi lưu ảnh:', error);
            alert('Lỗi khi lưu ảnh!');
        }
    };
    return (
        <div>
            <div className="modal-overlay">
                <div className="modal">
                    <div className="title-top">
                        <label className="title" htmlFor="">
                            Chọn ảnh đại diện
                        </label>
                        <button className="close-button" onClick={closeModal}>
                            <i class="fas fa-times-circle"></i>
                        </button>
                    </div>
                    <div className="set-avatar">
                        <div className="avatar">
                            <img src={imageSrc} alt="" className="avatar" />
                        </div>
                        <div>
                            <input
                                type="file"
                                id="file"
                                style={{ display: 'none' }}
                                accept="image/png, image/jpeg, image/gif"
                                ref={fileInputRef} // Gán tham chiếu
                                onChange={handleImageUpload}
                                // multiple
                            />
                            <div className="btn-img">
                                <i class="fas fa-camera font-size-18" onClick={handleIconClick}></i>
                                <span className="">Chọn ảnh đại diện khác.</span>
                            </div>
                        </div>
                    </div>
                    <div className="btn">
                        <button type="button" className="btn-submit" onClick={handleSave}>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSetAvata;
