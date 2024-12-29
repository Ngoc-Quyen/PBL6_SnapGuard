import React, { useRef, useState } from 'react';
import './share.scss';
import Select from 'react-select';
import { statusPost } from '../../utils/status';
import defaultImage from '../../assets/images/anhNhayCam.png';
import axios from 'axios';

const ModalPost = ({ userName, onClose, onPostCreated, ...props }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');

    const [values, setValues] = useState('');
    const [imagePreviews, setImagePreviews] = useState([]);
    const closeModal = () => {
        setImagePreviews([]);
        setValues('');
        onClose();
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files); // Lấy danh sách các tệp
        const validFiles = []; // Lưu trữ các file hợp lệ

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                // Gọi API nhận diện hình ảnh
                const response = await axios.post('http://localhost:8000/api/v1/image/predict', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Xử lý kết quả từ API
                const aiResult = response.data?.DT?.predicted_label || {};
                if (aiResult === 'unsafe') {
                    // Thêm ảnh mặc định nếu ảnh không an toàn
                    setImagePreviews((prev) => [...prev, defaultImage]);
                } else {
                    // Tạo URL ảnh nếu ảnh an toàn
                    validFiles.push(file); // Thêm file hợp lệ vào danh sách
                    const reader = new FileReader();
                    reader.onload = () => {
                        setImagePreviews((prev) => [...prev, reader.result]);
                    };
                    reader.readAsDataURL(file);
                }
            } catch (error) {
                console.error('Lỗi khi gọi API nhận diện hình ảnh:', error);
                alert('Không thể xử lý ảnh. Vui lòng thử lại.');
            }
        }

        const dataTransfer = new DataTransfer();
        validFiles.forEach((file) => dataTransfer.items.add(file));
        fileInputRef.current.files = dataTransfer.files;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn reload trang

        try {
            // Tạo FormData để gửi file và dữ liệu
            const formData = new FormData();
            formData.append('content', values); // Nội dung từ div chỉnh sửa
            formData.append('accessModifier', selectedOption?.value || 'public'); // Giá trị quyền truy cập
            if (fileInputRef.current.files[0]) {
                formData.append('image', fileInputRef.current.files[0]); // Thêm file ảnh vào FormData
            }

            // Gọi API
            const response = await axios.post(`${API_ENDPOINT}/posts`, formData, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                    'Content-Type': 'multipart/form-data', // Đảm bảo header đúng
                },
            });

            // Xử lý phản hồi thành công
            if (response.status === 201 || response.status === 200) {
                alert('Đăng bài thành công!');
                onPostCreated();
                closeModal(); // Đóng modal sau khi đăng thành công
            }
        } catch (error) {
            // Xử lý lỗi
            console.error('Error:', error.response?.data || error.message);
            closeModal();
            // alert('Có lỗi xảy ra khi đăng bài. Vui lòng thử lại.');
        }
    };

    const status = statusPost;
    const options = status.map((item) => ({
        value: item.accessModifier,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className={`fas ${item.classIcon}`} style={{ marginRight: 8 }}></i>
                {item.name}
            </div>
        ),
    }));
    const [selectedOption, setSelectedOption] = useState(options[1]); // Giá trị mặc định

    const fileInputRef = React.useRef(null);

    const handleIconClick = () => {
        // Mở input file khi nhấp vào biểu tượng
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const editableDivRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Ngăn chặn hành vi mặc định
            insertBrAtCursor(); // Chèn thẻ <br>

            // Lấy nội dung của editable div
            const content = editableDivRef.current.innerHTML;
            // Gửi dữ liệu lên server
            sendDataToServer(content);
        }
    };
    const handleBlur = () => {
        // Lấy nội dung khi mất tiêu điểm
        const content = editableDivRef.current.innerHTML;
        sendDataToServer(content); // Lưu nội dung
    };
    const insertBrAtCursor = () => {
        const sel = window.getSelection();
        const range = sel.getRangeAt(0);
        const br = document.createElement('br');
        range.deleteContents();
        range.insertNode(br);
        range.setStartAfter(br);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    };
    const sendDataToServer = async (content) => {
        try {
            setValues(content);
        } catch (error) {
            console.error('Error:', error); // Xử lý lỗi nếu có
        }
    };
    const handleRemoveImage = (index) => {
        setImagePreviews((imagePreviews) => imagePreviews.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="modal-overlay">
                <div className="modal">
                    <div className="title-top">
                        <label className="title" htmlFor="">
                            Tạo bài viết
                        </label>
                        <button className="close-button" onClick={closeModal}>
                            <i class="fas fa-times-circle"></i>
                        </button>
                    </div>
                    <div className="user">
                        <img src={props.src} alt="" />
                        <div className="info">
                            <span>{userName}</span>
                            <Select
                                options={options}
                                defaultValue={options[1]}
                                onChange={(option) => setSelectedOption(option)}
                            />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="content-post">
                            <div
                                contentEditable="true"
                                suppressContentEditableWarning={true}
                                ref={editableDivRef}
                                onKeyDown={handleKeyDown}
                                className="chatgpt"
                                data-placeholder="Bạn đang nghĩ gì?"
                                onBlur={handleBlur}
                            ></div>
                            <div className="grid-container">
                                {imagePreviews.length > 0 &&
                                    imagePreviews.map((image, index) => (
                                        <div className="grid-item">
                                            <img
                                                // style={{ width: '100px', height: '100px' }}
                                                key={index}
                                                src={image}
                                                alt={`Preview ${index + 1}`}
                                            />
                                            <i
                                                className="fas fa-times-circle"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleRemoveImage(index)}
                                            ></i>
                                        </div>
                                    ))}
                            </div>
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
                                            onChange={handleImageUpload}
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
                        <button type="submit">Đăng bài</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalPost;
