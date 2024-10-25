import React, { useRef, useState } from 'react';
import './share.scss';
import Select from 'react-select';
import axios from 'axios';

const ModalPost = ({ userName, onClose, ...props }) => {
    const [text, setText] = useState('');
    const [imagePreviews, setImagePreviews] = useState([]);
    const closeModal = () => {
        setText('');
        setImagePreviews([]);
        onClose();
    };
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submit logic here (e.g., API call)
        closeModal();
    };
    const status = [
        {
            id: 0,
            name: 'Chỉ mình tôi',
            classIcon: 'fa-lock',
        },
        {
            id: 1,
            name: 'Bạn bè',
            classIcon: 'fa-user-friends',
        },
        {
            id: 2,
            name: 'Mọi người',
            classIcon: 'fa-globe-asia',
        },
    ];
    const options = status.map((item) => ({
        value: item.id,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className={`fas ${item.classIcon}`} style={{ marginRight: 8 }}></i>
                {item.name}
            </div>
        ),
    }));
    const fileInputRef = React.useRef(null);

    const handleIconClick = () => {
        // Mở input file khi nhấp vào biểu tượng
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleTextChange = (e) => {
        setText(e.target.value);
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
    const [values, setValues] = useState('');
    const sendDataToServer = async (content) => {
        try {
            // const response = await axios.post('https://your-api-endpoint.com/submit', {
            //     content, // Gửi dữ liệu dưới dạng JSON
            // });

            // console.log('Success:', response.data); // Xử lý dữ liệu trả về nếu cần
            setValues(content);
            console.log('content: ', content);
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
                            <Select options={options} defaultValue={options[1]} />
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
                                            multiple
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
