import React from 'react';
import ItemNotification from './ItemNotification';
import { listNotification } from '../../utils/dataTest';
import { Link } from 'react-router-dom';
import NotificationNew from './NotificationNew';

const NotifiAll = () => {
    return (
        <div>
            <div className="type-notifi">
                <h3 className="type-name">Mới</h3>
                <Link className="show-all">Xem tất cả</Link>
            </div>
            <div className="item">
                {listNotification.length <= 0 ? (
                    <div className="error-message">Chưa thông báo nào</div>
                ) : (
                    listNotification.map((notifi) => {
                        return notifi.type === 'new' ? <NotificationNew key={notifi.id} notifi={notifi} /> : null;
                    })
                )}
            </div>
            <div className="type-notifi">
                <h3 className="type-name">Lời mời kết bạn</h3>
                <Link className="show-all" to={'/friends'}>
                    Xem tất cả
                </Link>
            </div>
            <div className="item">
                {listNotification.length <= 0 ? (
                    <div className="error-message">Chưa thông báo nào</div>
                ) : (
                    listNotification.map((notifi) => {
                        return notifi.type === 'friend_request' ? (
                            <ItemNotification key={notifi.id} notifi={notifi} />
                        ) : null;
                    })
                )}
            </div>
            <div className="type-notifi">
                <h3 className="type-name">Trước đó</h3>
                <Link className="show-all">Xem tất cả</Link>
            </div>
            <div className="item">
                {listNotification.length <= 0 ? (
                    <div className="error-message">Chưa thông báo nào</div>
                ) : (
                    listNotification.map((notifi) => {
                        return notifi.type === 'previous' ? <ItemNotification key={notifi.id} notifi={notifi} /> : null;
                    })
                )}
            </div>
        </div>
    );
};

export default NotifiAll;
