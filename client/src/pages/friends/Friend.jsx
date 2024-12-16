import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Friend = ({ friend, reload }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');

    const acceptFriend = async (senderId) => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/friend/accept/${senderId}`, {
                body: {},
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            return true;
        } catch (error) {
            console.log('🚀 ~ acceptFriend ~ error:', error);
        }
    };
    const rejectFriend = async (senderId) => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/friend/reject/${senderId}`, {
                body: {},
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            return true;
        } catch (error) {
            console.log('🚀 ~ rejectFriend ~ error:', error);
        }
    };
    const handleAccept = async (senderId) => {
        if (acceptFriend(senderId)) {
            reload();
        } else {
            alert('Request không thành công');
        }
    };
    const handleReject = async (senderId) => {
        if (rejectFriend(senderId)) {
            reload();
        } else {
            alert('Request không thành công');
        }
    };
    return (
        <div className="friend">
            <Link to={`/${friend.senderId}`} className="img-avt">
                <img src={friend.senderAvatar} alt="" />
            </Link>
            <div className="lable">
                <Link to={`/${friend.senderId}`} className="nameUser">
                    {friend.senderName}
                </Link>
            </div>
            <div className="btn">
                <button
                    className="btn-accept"
                    onClick={() => {
                        handleAccept(friend.requestId);
                    }}
                >
                    Xác nhận
                </button>
                <button
                    className="btn-cancel"
                    onClick={() => {
                        handleReject(friend.requestId);
                    }}
                >
                    Xóa
                </button>
            </div>
        </div>
    );
};

export default Friend;
