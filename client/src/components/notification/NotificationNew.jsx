import React, { useEffect, useState } from 'react';
import './notification.scss';
import { Link, useNavigate } from 'react-router-dom';
import { calculateTimeDifference } from '../../utils/calculateTimeDifference ';
import axios from 'axios';
import Post from '../post/Post';
import { typeNotifine } from '../../utils/typeNotifine';

const NotificationNew = ({ notifi, handleListNotifine }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');

    const checkRead = async () => {
        try {
            const response = await axios.patch(`${API_ENDPOINT}/notification/${notifi.id}/read`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            return response.data.is_read;
        } catch (error) {
            console.log('🚀 ~ checkRead ~ error:', error);
        }
    };
    const [checkSeen, setCheckSeen] = useState(false);
    const [bell, setBell] = useState(false);
    const handleCheckRead = async () => {
        const result = await checkRead();
        if (result) {
            await handleListNotifine();
            console.log('đã click');
        }
    };
    const navigate = useNavigate();
    const handleClickFriends = async () => {
        if (notifi.type === typeNotifine.FRIEND_REQUEST) {
            navigate(`/${notifi.sender.id}`);
        } else {
            navigate(`/post/${notifi.post_id}`);
        }
    };
    return (
        <div
            className="item-chat"
            onClick={() => {
                handleCheckRead();
                handleClickFriends();
            }}
        >
            <div className="item-avata">
                <img src={notifi.sender.avatar_url} alt="" />
            </div>
            <div className="item-content">
                <p className="content cl-text">
                    <span className="name">{notifi.sender.full_name}</span> {notifi.content}
                </p>
                <span className="time cl-blue">{calculateTimeDifference(notifi.created_at)}</span>
            </div>

            <div className="modal-menu" style={{ display: 'none' }}>
                <div className="check-seen" onClick={() => setCheckSeen(!checkSeen)}>
                    {checkSeen ? (
                        <>
                            <i class="far fa-envelope"></i>
                            <span className="menu-content">Đánh dấu chưa đọc</span>
                        </>
                    ) : (
                        <>
                            <i class="far fa-envelope-open"></i>
                            <span className="menu-content">Đánh dấu đã đọc</span>
                        </>
                    )}
                </div>
                <div className="check-bell" onClick={() => setBell(!bell)}>
                    {bell ? (
                        <>
                            <i class="far fa-bell-slash"></i>
                            <span className="menu-content">Tắt thông báo</span>
                        </>
                    ) : (
                        <>
                            <i class="far fa-bell"></i>
                            <span className="menu-content">Bật thông báo</span>
                        </>
                    )}
                </div>
                <Link className="remove">
                    <i class="far fa-trash-alt"></i>
                    Xóa thông báo này
                </Link>
            </div>
        </div>
    );
};

export default NotificationNew;
