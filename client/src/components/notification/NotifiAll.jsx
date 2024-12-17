import React, { useEffect, useState } from 'react';
import ItemNotification from './ItemNotification';
import { Link } from 'react-router-dom';
import NotificationNew from './NotificationNew';
import { typeNotifine } from '../../utils/typeNotifine';
import axios from 'axios';

const NotifiAll = ({ listNotifine, handleListNotifine }) => {
    if (!Array.isArray(listNotifine) || listNotifine.length === 0) {
        return <div className="error-message">Chưa có thông báo nào</div>;
    }

    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');

    const checkAllRead = async () => {
        try {
            const response = await axios.patch(`${API_ENDPOINT}/notification/read-all`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            console.log('done');
            await handleListNotifine();
        } catch (error) {
            console.log('🚀 ~ checkAllRead ~ error:', error);
        }
    };
    // Lọc các loại thông báo
    const unreadNotifications = listNotifine.filter((notifi) => notifi.is_read === false);
    const friendRequestNotifications = listNotifine.filter((notifi) => notifi.type === typeNotifine.FRIEND_REQUEST);
    const readNotifications = listNotifine.filter((notifi) => notifi.is_read === true);
    return (
        <div>
            {/* Hiển thị thông báo "Mới" nếu có thông báo chưa đọc */}
            {unreadNotifications.length > 0 && (
                <>
                    <div className="type-notifi">
                        <h3 className="type-name">Mới</h3>
                        <div
                            className="show-all"
                            onClick={() => {
                                checkAllRead();
                            }}
                        >
                            Đánh dấu đã đọc
                        </div>
                    </div>
                    {unreadNotifications.map((notifi) => (
                        <NotificationNew key={notifi.id} notifi={notifi} handleListNotifine={handleListNotifine} />
                    ))}
                </>
            )}

            {/* Hiển thị thông báo "Lời mời kết bạn" nếu có thông báo lời mời kết bạn chưa đọc */}
            {friendRequestNotifications.length > 0 && (
                <>
                    <div className="type-notifi">
                        <h3 className="type-name">Lời mời kết bạn</h3>
                        <Link className="show-all" to={'/friends'}>
                            Xem tất cả
                        </Link>
                    </div>
                    {friendRequestNotifications.map((notifi) => (
                        <ItemNotification key={notifi.id} notifi={notifi} />
                    ))}
                </>
            )}

            {/* Hiển thị thông báo "Trước đó" nếu có thông báo đã đọc */}
            {readNotifications.length > 0 && (
                <>
                    <div className="type-notifi">
                        <h3 className="type-name">Trước đó</h3>
                        <Link className="show-all">Xem tất cả</Link>
                    </div>
                    {readNotifications.map((notifi) => (
                        <ItemNotification key={notifi.id} notifi={notifi} />
                    ))}
                </>
            )}
        </div>
    );
};

export default NotifiAll;
