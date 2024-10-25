import React, { useState } from 'react';
import './notification.scss';
import { Link } from 'react-router-dom';

const ItemNotification = (props) => {
    const [checkSeen, setCheckSeen] = useState(false);
    const [bell, setBell] = useState(false);
    return (
        <div className="item-chat">
            <div className="item-avata">
                <img src={props.notifi.avatar_url} alt="" />
            </div>
            <div className="item-content">
                <p className="content">
                    <span className="name">{props.notifi.name}</span> {props.notifi.message}
                </p>
                <span className="time">{props.notifi.time}</span>
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

export default ItemNotification;
