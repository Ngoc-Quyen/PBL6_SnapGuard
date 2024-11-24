import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { statusPost } from '../../utils/status';
import Select from 'react-select';
import './post.scss';

const ModalEdit = ({ onClose, post, user, onDeleteSuccess }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');

    const [values, setValues] = useState(post.content);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [previewImage, setPreviewImage] = useState(post.image_url);
    const textareaRef = useRef(null);
    const [image, setImage] = useState(null);

    const closeModal = () => {
        setImagePreviews([]);
        setValues('');
        onClose();
    };
    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            // textarea.style.height = 'auto'; // Đặt lại chiều cao ban đầu
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
    const setCursorToEnd = () => {
        const el = editableDivRef.current; // Tham chiếu đến div
        if (!el) return;

        const range = document.createRange();
        const sel = window.getSelection();

        // Đặt range ở cuối nội dung
        range.selectNodeContents(el);
        range.collapse(false);

        // Thiết lập vùng chọn
        sel.removeAllRanges();
        sel.addRange(range);
    };

    // useEffect(() => {
    //     if (post) {
    //         setValues(post.content);
    //         setCursorToEnd();
    //         setPreviewImage(post.image_url);
    //     }
    // }, [post]);
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files); // Lấy danh sách các tệp
        const newImagePreviews = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                newImagePreviews.push(reader.result); // Thêm URL ảnh vào mảng
                if (newImagePreviews.length === files.length) {
                    setImagePreviews((prev) => [...prev, ...newImagePreviews]); // Cập nhật state khi tất cả ảnh được load
                }
            };
            reader.readAsDataURL(file); // Đọc tệp dưới dạng URL
        });
    };

    const handleUpdatePost = async () => {
        if (values.trim() || image) {
            try {
                const formData = new FormData(); // Tạo FormData để gửi file
                formData.append('content', values); // Thêm nội dung bình luận
                if (image) {
                    formData.append('image', image); // Thêm file ảnh vào FormData
                }
                formData.append('accessModifier', selectedOption?.value); // Giá trị quyền truy cập

                const response = await axios.put(`${API_ENDPOINT}/posts/${post.post_id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        'Content-Type': 'multipart/form-data', // Đặt header cho FormData
                    },
                });

                if (response.status === 201 || response.status === 200) {
                    console.log('Cập nhật bài viết thành công!');
                }
                onDeleteSuccess();
                onClose();
            } catch (error) {
                console.error('Error:', error.response?.data || error.message);
                alert('Có lỗi xảy ra khi cập nhật bài viết. Vui lòng thử lại.');
            }
        } else {
            alert('Vui lòng nhập bình luận hoặc chọn ảnh!');
        }
    };

    const status = statusPost;
    const options =
        status.map((item) => ({
            value: item.accessModifier,
            label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className={`fas ${item.classIcon}`} style={{ marginRight: 8 }}></i>
                    {item.name}
                </div>
            ),
        })) || [];
    const defaultOption = options.find((option) => option.value === post.access_modifier);
    const [selectedOption, setSelectedOption] = useState(defaultOption); // Giá trị mặc định

    const fileInputRef = React.useRef(null);

    const handleIconClick = () => {
        // Mở input file khi nhấp vào biểu tượng
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const editableDivRef = useRef(null);

    return (
        <div className="modal-edit">
            <div className="modal-overlay">
                <div className="modal">
                    <div className="title-top">
                        <label className="title" htmlFor="">
                            Chỉnh sửa bài viết
                        </label>
                        <button className="close-button" onClick={closeModal}>
                            <i class="fas fa-times-circle"></i>
                        </button>
                    </div>
                    <div className="user-modal">
                        <div className="user-avatar">
                            <img src={user.avatar_url} alt="" />
                        </div>
                        <div className="info">
                            <span>{user.full_name}</span>
                            <Select
                                options={options}
                                defaultValue={defaultOption}
                                onChange={(option) => setSelectedOption(option)}
                            />
                        </div>
                    </div>
                    <div className="form-edit">
                        <div className="content-post">
                            <textarea
                                ref={textareaRef}
                                className="input-textarea"
                                onInput={handleInput}
                                value={values}
                                onChange={(e) => setValues(e.target.value)}
                            />
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
                        <div className="footer">
                            <div className="more">
                                <span>Thêm vào bài viết của bạn</span>
                                <div className="right">
                                    <div className="item">
                                        <input
                                            type="file"
                                            id="file"
                                            style={{ display: 'none' }}
                                            accept="image/png, image/jpeg, image/gif"
                                            ref={fileInputRef} // Gán tham chiếu
                                            onChange={handleFileChange}
                                            // multiple
                                        />
                                        <i class="fa-regular fa-image" title="Ảnh/Video" onClick={handleIconClick}></i>
                                    </div>
                                    <div className="item">
                                        <i class="fa-solid fa-map-location-dot" title="Check in"></i>
                                    </div>
                                    <div className="item">
                                        <i class="fa-regular fa-face-laugh-beam" title="Cảm xúc/Hoạt động"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div dangerouslySetInnerHTML={{ __html: values }}></div> */}
                        <button onClick={handleUpdatePost}>Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEdit;
