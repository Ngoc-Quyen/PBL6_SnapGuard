import React from 'react';
import './profile.scss';
import { Link } from 'react-router-dom';

const Friend = ({ friend }) => {
    return (
        <div className="friend">
            <Link className="friend-avata" to={`/${friend.id}`}>
                <img src={friend.avatar_url} alt="" />
            </Link>
            <div className="friend-name">{friend.full_name}</div>
            <div className="modal">
                <div className="modal-info">
                    <Link to={`/${friend.id}`} className="info-left">
                        <img src={friend.avatar_url} alt="" />
                    </Link>
                    <div className="info-right">
                        <Link to={`/${friend.id}`} className="info-name">
                            {friend.full_name}
                        </Link>
                        <div className="info-friend">
                            <i class="fas fa-user-friends"></i>
                            <span>6 bạn chung</span>
                        </div>
                        <div className="info-address">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Từ Quảng Nam</span>
                        </div>
                    </div>
                </div>
                <div className="modal-btn">
                    <div className="btn-friend">
                        <i class="fas fa-user-check"></i>
                        <span>Bạn bè</span>
                    </div>
                    <Link to={`/chat/${friend.friendId}`} className="btn-chat">
                        <i class="fab fa-facebook-messenger"></i>
                        <span>Nhắn tin</span>
                    </Link>
                    <div className="btn-menu">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Friend;
