import React from 'react';
import ItemChat from './ItemChat';
import './chatLeft.scss';
import { listFriendChat } from '../../utils/dataTest';
const ChatLeft = () => {
    return (
        <div className="chat-left">
            <div className="header">
                <h1 className="title">Đoạn chat</h1>
                <div className="menu">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            <div className="search">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Tìm kiếm trên đoạn chat" />
            </div>
            <div className="item">
                {listFriendChat.length <= 0 ? (
                    <div className="error-message">Chưa có bạn chat</div>
                ) : (
                    listFriendChat.map((user) => <ItemChat key={user.id} user={user} />)
                )}
            </div>
        </div>
    );
};

export default ChatLeft;
