import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemChat from './ItemChat';
import SearchChatItem from './SearchItemChat';
import './chatLeft.scss';

const ChatLeft = () => {
    const storedToken = localStorage.getItem('token');
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://pbl6-snapguard.onrender.com';
    const [listFriendChat, setListFriendChat] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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


    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query) {
            try {
                const response = await axios.post(`${API_ENDPOINT}/user/search?query=${query}`, null, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setSearchResults([]);
        }
    };


    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
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
                <input
                    type="text"
                    placeholder="Tìm kiếm trên đoạn chat"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {searchQuery && (
                    <button className="clear-search" onClick={handleClearSearch}>
                        <i className="fas fa-times"></i>
                    </button>
                )}
            </div>
            <div className="item">
                {searchQuery ? (
                    searchResults.length === 0 ? (
                        <div className="error-message">Không tìm thấy kết quả</div>
                    ) : (
                        searchResults.map((user) => (
                            <SearchChatItem
                                key={user.id}
                                user={{
                                    id: user.id,
                                    avatar: user.avatar_url,
                                    name: user.full_name,
                                }}
                            />
                        ))
                    )
                ) : listFriendChat.length === 0 ? (
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
                            onDelete={handleDeleteChat}
                            isSearchResult={false}
                        />
                    ))
                )}
            </div>

        </div>
    );
};

export default ChatLeft;
