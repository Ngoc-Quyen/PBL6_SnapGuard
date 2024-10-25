import React from 'react';

const FriendRequestOut = ({ friend }) => {
    return (
        <div className="friend">
            <div className="img-avt">
                <img src={friend.recipientAvatar} alt="" />
            </div>
            <div className="lable">
                <p className="nameUser">{friend.recipientName}</p>
            </div>
            <div className="btn">
                <button className="btn-accept">Hủy lời mời</button>
                <button className="btn-cancel">Xóa</button>
            </div>
        </div>
    );
};

export default FriendRequestOut;
