import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const FriendRequestOut = ({ friend, reload }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const rejectFriend = async (senderId) => {
        console.log('🚀 ~ rejectFriend ~ senderId:', senderId);
        try {
            const response = await axios.delete(
                `${API_ENDPOINT}/friend/cancel/${senderId}`,
                {}, // Body rỗng
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
            );
            return true;
        } catch (error) {
            console.error('🚀 ~ cancelFriend ~ error:', error);
            return false; // Trả về false nếu có lỗi
        }
    };

    const handleCancel = async (senderId) => {
        try {
            const success = await rejectFriend(senderId); // Đợi rejectFriend hoàn thành
            if (success) {
                reload();
            } else {
                alert('Request không thành công');
            }
        } catch (error) {
            console.error('Error in handleCancel:', error);
            alert('Request không thành công');
        }
    };
    const showProfile = () => {
        console.log('Chưa có API gọi userById');
    };
    return (
        <div className="friend">
            <Link to={`/${friend.recipientId}`} className="img-avt">
                <img src={friend.recipientAvatar} alt="" />
            </Link>
            <div className="lable">
                <Link to={`/${friend.recipientId}`} className="nameUser">
                    {friend.recipientName}
                </Link>
            </div>
            <div className="btn">
                <button
                    className="btn-accept"
                    onClick={() => {
                        handleCancel(friend.recipientId);
                    }}
                >
                    Hủy lời mời
                </button>
                <button
                    className="btn-cancel"
                    onClick={() => {
                        handleCancel(friend.recipientId);
                    }}
                >
                    Xóa
                </button>
            </div>
        </div>
    );
};

export default FriendRequestOut;
