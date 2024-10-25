import React, { useRef, useState } from 'react';
import './chat.scss';

const ChatDetail = (props) => {
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const [chat, setChat] = useState('');
    const [images, setImages] = useState([]); // Lưu nhiều ảnh
    const [previewImages, setPreviewImages] = useState([]); // Lưu URL xem trước cho nhiều ảnh

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Đặt lại chiều cao ban đầu
            textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`; // Cập nhật chiều cao tối đa là 300px
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setImages((prevImages) => [...prevImages, ...files]);
            const newPreviewImages = files.map((file) => URL.createObjectURL(file));
            setPreviewImages((prevPreviewImages) => [...prevPreviewImages, ...newPreviewImages]);
        }
    };
    const handleIconClick = () => {
        // Kích hoạt input file khi bấm vào icon
        fileInputRef.current.click();
    };
    const handleSendComment = () => {
        if (chat.trim() || images.length > 0) {
            console.log('Nội dung bình luận:', chat);
            if (images.length > 0) {
                console.log('Danh sách ảnh đính kèm:', images);
            }
            // Thực hiện gửi nội dung bình luận và danh sách ảnh lên server tại đây

            // Xóa nội dung ô nhập và ảnh sau khi gửi
            setChat('');
            setImages([]);
            setPreviewImages([]);
            fileInputRef.current.value = null;
        } else {
            alert('Vui lòng nhập bình luận hoặc chọn ảnh!');
        }
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setPreviewImages((prevPreviewImages) => prevPreviewImages.filter((_, i) => i !== index));
    };
    return (
        <div className="chat">
            <div className="header">
                <div className="info-user">
                    <div className="avata">
                        <img src={props.user.avatar_url} alt="" />
                    </div>
                    <h4 className="name">{props.user.full_name}</h4>
                </div>
                <div className="info-detail">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            <div className="container">
                <p>Hello</p>
                <p>Chào bạn</p>
            </div>
            <div className="footer">
                {previewImages.length > 0 && (
                    <div className="image-preview-container">
                        {previewImages.map((previewImage, index) => (
                            <div key={index} className="image-preview">
                                <img src={previewImage} alt="Ảnh đã chọn" />
                                <i
                                    className="fas fa-times-circle"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleRemoveImage(index)}
                                ></i>
                            </div>
                        ))}
                    </div>
                )}
                <div className="input-send">
                    <div className="input">
                        <div className="btn-img">
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/gif"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple
                            />

                            <i
                                className="far fa-file-image"
                                style={{ cursor: 'pointer' }}
                                onClick={handleIconClick}
                            ></i>
                        </div>
                        <textarea
                            ref={textareaRef}
                            placeholder="Aa"
                            className="input-textarea"
                            onInput={handleInput}
                            value={chat}
                            onChange={(e) => setChat(e.target.value)}
                        />
                        <div className="btn-icon">
                            <i class="far fa-smile-beam"></i>
                        </div>
                    </div>
                    <div className="send">
                        <i class="fas fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatDetail;
