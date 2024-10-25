import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import './chatLeft.scss';

const ItemChat = (props) => {
    const [checkSeen, setCheckSeen] = useState(false);
    const [bell, setBell] = useState(false);

    // Chuyển đổi timestamp thành đối tượng Date
    const parsedTime = parseISO(props.user.time);

    // Tính toán thời gian tương đối
    const timeAgo = formatDistanceToNow(parsedTime, {
        addSuffix: true,
        locale: vi,
    });

    return (
        <Link to={`/chat/${props.user.id}`} className="link-item-chat">
            <div className="item-chat">
                <div className="item-avata">
                    <img
                        src={props.user.avatar || 'https://i.imgur.com/q3mEf9u.jpeg'}
                        alt={`${props.user.name || 'Unknown User'} Avatar`}
                    />
                </div>
                <div className="item-info">
                    <h4 className="item-name">{props.user.name}</h4>
                    <div className="item-detail">
                        <p className="item-content">{props.user.content}</p>
                        <span className="time">{timeAgo}</span>
                    </div>
                </div>

                {/* <div className="modal-menu" style={{ display: 'none' }}>
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
                <Link className="profile" to={`/profile/${props.user.id}`}>
                    <i class="far fa-user-circle"></i>
                    Xem trang cá nhân
                </Link>
                <Link className="block">
                    <i class="fas fa-user-lock"></i>
                    Chặn
                </Link>
                <Link className="remove">
                    <i class="far fa-trash-alt"></i>
                    Xóa đoạn chat
                </Link>
                <Link className="save">
                    <i class="fas fa-archive"></i>
                    Lưu trữ đoạn chat
                </Link>
            </div> */}
            </div>
        </Link>
    );
};

export default ItemChat;
