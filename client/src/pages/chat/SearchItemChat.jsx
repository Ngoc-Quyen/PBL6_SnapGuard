import React from 'react';
import { Link } from 'react-router-dom';
import './chatLeft.scss';

const SearchChatItem = ({ user }) => {
    return (
        <Link to={`/chat/${user.id}`} className="link-item-chat">
            <div className="item-chat">
                <div className="item-avata">
                    <img
                        src={user.avatar || 'https://i.imgur.com/q3mEf9u.jpeg'}
                        alt={`${user.name || 'Unknown User'} Avatar`}
                    />
                </div>
                <div className="item-info">
                    <h4 className="item-name">{user.name}</h4>
                </div>
            </div>

        </Link>
    );
};

export default SearchChatItem;