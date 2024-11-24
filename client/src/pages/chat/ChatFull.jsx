import React from 'react';
import './chat.scss';
import ChatDetail from './ChatDetail';
import NoChatSelected from './NoChatSelected';
const ChatFull = () => {
    return (
        <div>
            {true ? <NoChatSelected /> : <ChatDetail />}
        </div>
    );
};

export default ChatFull;
