import React from 'react';
import { Link } from 'react-router-dom';

const FriendSuggestion = ({ friend }) => {
    return (
        <div className="friend">
            <Link to={`/${friend.id}`} className="img-avt">
                <img src={friend.avatar_url} alt="" />
            </Link>
            <div className="lable">
                <Link to={`/${friend.recipientId}`} className="nameUser">
                    {friend.full_name}
                </Link>
            </div>
            <div className="btn">
                <button className="btn-accept">Thêm bạn bè</button>
                <button className="btn-cancel">Gỡ</button>
            </div>
        </div>
    );
};

export default FriendSuggestion;
