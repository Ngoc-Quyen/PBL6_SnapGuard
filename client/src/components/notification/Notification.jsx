import React, { useEffect, useState } from 'react';
import './notification.scss';
import NotifiAll from './NotifiAll';
import NotifiNonRead from './NotifiNonRead';
import axios from 'axios';
const Notification = ({ setNumberNotifine }) => {
    const [nonRead, setNonRead] = useState(false);
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const [listNotifine, setListNotifine] = useState([]);
    const [listNotifineNoRead, setListNotifineNoRead] = useState([]);
    const handleListNotifine = async () => {
        try {
            const result = await axios.get(`${API_ENDPOINT}/notification`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            setListNotifine(result.data);

            const unReadNotifine = listNotifine.filter((notifine) => notifine.is_read === false);
            setListNotifineNoRead(unReadNotifine);
            setNumberNotifine(0);
        } catch (error) {
            console.log('🚀 ~ listNotifine ~ error:', error);
        }
    };
    const handleShowNonRead = () => {
        setNonRead(true);
    };
    const handleShowAll = () => {
        setNonRead(false); // Đảm bảo chỉ gọi khi người dùng click
    };
    useEffect(() => {
        handleListNotifine();
    }, [nonRead]);
    return (
        <div className="notification">
            <div className="header">
                <h1 className="title">Thông báo</h1>
                <div className="menu">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            <div className="option">
                <div className={`btn all ${!nonRead ? 'designate' : ''}`} onClick={handleShowAll}>
                    Tất cả
                </div>
                <div className={`btn nonRead ${nonRead ? 'designate' : ''}`} onClick={handleShowNonRead}>
                    Chưa đọc
                </div>
            </div>
            {/* Hiển thị thông báo dựa trên giá trị của nonRead */}
            {nonRead ? (
                <NotifiNonRead listNotifineNoRead={listNotifineNoRead} handleListNotifine={handleListNotifine()} />
            ) : (
                <NotifiAll listNotifine={listNotifine} handleListNotifine={handleListNotifine()} />
            )}
        </div>
    );
};

export default Notification;
