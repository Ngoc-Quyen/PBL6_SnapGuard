import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemChat from './ItemChat';
import './chatLeft.scss';

const ChatLeft = () => {
    const storedToken = localStorage.getItem('token');
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://pbl6-snapguard.onrender.com';
    const [listFriendChat, setListFriendChat] = useState([]);

    useEffect(() => {
        const fetchChatsLeft = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/chat`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
                setListFriendChat(response.data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChatsLeft();
    }, [API_ENDPOINT]);

    const handleDeleteChat = (chatId) => {
        setListFriendChat((prevChats) => prevChats.filter((chat) => chat.userId !== chatId));
    };

    return (
        <div className="chat-left">
            <div className="header">
                <h1 className="title">Đoạn chat</h1>
                <div className="menu">
                    <i className="fas fa-ellipsis-h"></i>
                </div>
            </div>
            <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm kiếm trên đoạn chat" />
            </div>
            <div className="item">
                {listFriendChat.length === 0 ? (
                    <div className="error-message">Chưa có bạn chat</div>
                ) : (
                    listFriendChat.map((user) => (
                        <ItemChat
                            key={user.userId}
                            user={{
                                id: user.userId,
                                avatar: user.userAvatar,
                                name: user.userName,
                                content: user.lastMessage,
                                time: user.timestamp,
                            }}
                            onDelete={handleDeleteChat} // Truyền callback vào
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ChatLeft;
