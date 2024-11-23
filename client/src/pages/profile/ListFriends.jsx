import React from 'react';
import './profile.scss';
import { Link } from 'react-router-dom';

const ListFriends = () => {
    return (
        <div className="list-friends">
            <div className="title">
                <h2>Bạn bè</h2>
                <Link>Xem tất cả</Link>
            </div>
            <div className="title-number-friends">
                <span>4 người bạn</span>
            </div>
            <div className="friends">
                <div className="friend-item">
                    <div className="item-avata">
                        <img src="" alt="" />
                    </div>
                    <div className="item-name"></div>
                </div>
            </div>
        </div>
    );
};

export default ListFriends;
