import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './chat.scss';
import { io } from "socket.io-client";

const ChatDetail = () => {

    const { id } = useParams();
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const [chat, setChat] = useState('');
    const [images, setImages] = useState([]); // Lưu nhiều ảnh
    const [previewImages, setPreviewImages] = useState([]); // Lưu URL xem trước cho nhiều ảnh
    const messagesEndRef = useRef(null); // Tham chiếu đến cuối danh sách tin nhắn

    const storedToken = localStorage.getItem('token');
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://pbl6-snapguard.onrender.com';

    const [user, setUser] = useState({});
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        const fetchChatDetail = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/chat/messages/${id}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
                const data = response.data.all_message;
                setUser({
                    id: data.left.id,
                    avatar_url: data.left.avatar,
                    full_name: data.left.name,
                });

                // Sắp xếp tin nhắn theo thời gian
                const sortedMessages = [
                    ...data.right.messages.map(msg => ({ ...msg, sender: "me" })),
                    ...data.left.messages.map(msg => ({ ...msg, sender: "other" }))
                ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                setMessages(sortedMessages);
            } catch (error) {
                console.error('Error fetching chat detail:', error);
            }
        };

        fetchChatDetail();
    }, [id]);


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
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

        fileInputRef.current.click();
    };

    const handleSendComment = async () => {
        if (chat.trim() || images.length > 0) {
            const formData = new FormData();
            formData.append('receiverId', id);
            formData.append('content', chat);

            // Thêm ảnh nếu có
            images.forEach(image => {
                formData.append('image', image);
            });

            try {
                const response = await axios.post(`${API_ENDPOINT}/chat/sendMessage`, formData, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    const newMessage = {
                        id: messages.length + 1,
                        content: chat,
                        timestamp: new Date().toISOString(),
                        sender: "me",
                        imageUrl: images.length > 0 ? URL.createObjectURL(images[0]) : "",
                    };

                    // Thêm tin nhắn mới vào danh sách và sắp xếp lại
                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages, newMessage];
                        return updatedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                    });

                    setChat('');
                    setImages([]);
                    setPreviewImages([]);
                    fileInputRef.current.value = null;
                }
            } catch (error) {
                console.error('Error sending message:', error);
                alert('Có lỗi xảy ra khi gửi tin nhắn!');
            }
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
                <Link to={`/profile/${user.id}`} className="link-detail-chat">
                    <div className="info-user">
                        <div className="avata">
                            <img
                                src={user.avatar_url || 'https://i.imgur.com/q3mEf9u.jpeg'}
                                alt={`${user.name || 'Unknown User'} Avatar`}
                            />
                        </div>
                        <h4 className="name">{user.full_name}</h4>
                    </div>
                </Link>
                <div className="info-detail">
                    <i className="fas fa-info-circle"></i>
                </div>
            </div>
            <div className="container">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.sender === "me" ? "right" : "left"}`}
                    >
                        <p>{message.content}</p>
                        {message.imageUrl && <img src={message.imageUrl} alt="Ảnh đính kèm" />}
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* Đánh dấu vị trí cuối cùng */}
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
                        <div className="send" onClick={handleSendComment}>
                            <i className="fas fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatDetail;






