import React, { useState } from 'react';
import { listFriendChat, listInvitation, listNotification } from '../../utils/dataTest';
import ItemChat from '../../pages/chat/ItemChat';
import './notification.scss';
import { Link } from 'react-router-dom';
import ItemNotification from './ItemNotification';
import NotificationNew from './NotificationNew';
import NotifiAll from './NotifiAll';
import NotifiNonRead from './NotifiNonRead';
const Notification = () => {
    const [nonRead, setNonRead] = useState(false);
    const handleShowNonRead = () => {
        setNonRead(true);
    };
    const handleShowAll = () => {
        setNonRead(false); // Đảm bảo chỉ gọi khi người dùng click
    };
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
            {nonRead ? <NotifiNonRead /> : <NotifiAll />}
        </div>
    );
};

export default Notification;
