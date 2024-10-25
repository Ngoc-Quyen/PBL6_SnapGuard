import React, { useEffect, useState } from 'react';
import ItemNotification from './ItemNotification';
import { listNotification } from '../../utils/dataTest';
import { Link } from 'react-router-dom';
import NotificationNew from './NotificationNew';
import axios from 'axios';
import { typeNotifine } from '../../utils/typeNotifine';

const NotifiAll = () => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const [listNotifine, setListNotifine] = useState([]);
    const handelListNotifine = async () => {
        try {
            const result = await axios.get(`${API_ENDPOINT}/notification/`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            setListNotifine(result.data);
            console.log('🚀 ~ listNotifine ~ result.data:', result.data);
        } catch (error) {
            console.log('🚀 ~ listNotifine ~ error:', error);
        }
    };

    useEffect(() => {
        handelListNotifine();
    }, [API_ENDPOINT]);
    return (
        <div>
            <div className="item">
                {listNotifine.length <= 0 ? (
                    <div className="error-message">Chưa thông báo nào</div>
                ) : (
                    <>
                        {/* Kiểm tra nếu có thông báo chưa đọc (is_read === false) thì hiển thị "Mới" */}
                        {listNotifine.some((notifi) => notifi.is_read === false) && (
                            <div className="type-notifi">
                                <h3 className="type-name">Mới</h3>
                            </div>
                        )}

                        {/* Hiển thị các thông báo chưa đọc */}
                        {listNotifine.map((notifi) =>
                            notifi.is_read === false ? <NotificationNew key={notifi.id} notifi={notifi} /> : null
                        )}
                    </>
                )}
            </div>

            <div className="type-notifi">
                <h3 className="type-name">Lời mời kết bạn</h3>
                <Link className="show-all" to={'/friends'}>
                    Xem tất cả
                </Link>
            </div>
            <div className="item">
                {listNotifine.length <= 0 ? (
                    <div className="error-message">Chưa thông báo nào</div>
                ) : (
                    listNotifine.map((notifi) => {
                        if (notifi.type === typeNotifine.FRIEND_REQUEST) {
                            return <ItemNotification key={notifi.id} notifi={notifi} />;
                        }
                        return null;
                    })
                )}
            </div>
            <div className="type-notifi">
                <h3 className="type-name">Trước đó</h3>
                <Link className="show-all">Xem tất cả</Link>
            </div>
            <div className="item">
                {listNotifine.length <= 0 ? (
                    <div className="error-message">Chưa thông báo nào</div>
                ) : (
                    listNotifine.map((notifi) => {
                        return notifi.is_read === true ? <ItemNotification key={notifi.id} notifi={notifi} /> : null;
                    })
                )}
            </div>
        </div>
    );
};

export default NotifiAll;
