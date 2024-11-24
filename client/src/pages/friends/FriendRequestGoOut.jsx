import React from 'react';

const FriendRequestOut = ({ friend }) => {
    const showProfile = () => {
        console.log('Chưa có API gọi userById');
    };
    return (
        <div className="friend">
            <div className="img-avt" onClick={showProfile}>
                <img src={friend.recipientAvatar} alt="" />
            </div>
            <div className="lable" onClick={showProfile}>
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
