import React, { useState } from 'react';
import Friend from './Friend';
import { listInvitation } from '../../utils/dataTest';
import './friend.scss';
import { Link } from 'react-router-dom';
const ListFriendsRequest = () => {
    const [visibleCount, setVisibleCount] = useState(5);
    const [isClick, setIsClick] = useState(false);
    const list = listInvitation;
    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 5); // Tăng thêm 2 bạn bè mỗi lần nhấn "Xem thêm"
    };
    const handleShowAll = () => {
        if (!isClick) {
            setVisibleCount(list.length); // Hiển thị tất cả bạn bè
        } else {
            setVisibleCount(10); // Trở lại hiển thị 10 bạn bè
        }
        setIsClick(!isClick); // Đảo ngược trạng thái isClick
    };
    return (
        <div className="friends">
            <div className="title">
                <h2>Lời mời kết bạn</h2>
                <Link className="show-all" onClick={handleShowAll}>
                    {isClick ? 'Ẩn bớt' : 'Xem tất cả'}
                </Link>
            </div>
            <div className="show-list">
                {list.slice(0, visibleCount).map((friend) => (
                    <Friend key={friend.id} name={friend.name} avata={friend.avata} />
                ))}
            </div>

            <div style={{ borderBottom: '2px solid rgb(179, 177, 177)', margin: '20px 0px' }}>
                {visibleCount < list.length && ( // Hiển thị nút "Xem thêm" chỉ khi còn bạn bè để hiển thị
                    <div className="more" onClick={handleShowMore}>
                        <p className="more-title">Xem thêm</p>
                        <i className="fas fa-sort-down"></i>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListFriendsRequest;
