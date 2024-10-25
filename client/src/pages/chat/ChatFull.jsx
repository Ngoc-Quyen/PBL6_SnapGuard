import React from 'react';
import './chat.scss';
import ChatDetail from './ChatDetail';
import { listFriendChat } from '../../utils/dataTest';

const ChatFull = () => {
    const friendWithId2 = listFriendChat.find((friend) => friend.id === 2);
    return (
        <div>
            <ChatDetail user={friendWithId2} />
        </div>
    );
};

export default ChatFull;
