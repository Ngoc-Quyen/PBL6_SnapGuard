import React from 'react';
import { Link } from 'react-router-dom';
const MyFriend = ({ friend }) => {
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
                <Link to={`/chat/${friend.id}`} className="btn-accept">
                    Nhắn tin
                </Link>
                <button className="btn-cancel">Hủy kết bạn</button>
            </div>
        </div>
    );
};

export default MyFriend;
