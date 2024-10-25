import React, { useState } from 'react';
import FriendSuggestion from './FriendSuggestion';
import { listInvitation } from '../../utils/dataTest';
import './friend.scss';
import { Link } from 'react-router-dom';
const ListFriendsSuggestion = () => {
    const list = listInvitation;

    const [visibleCount, setVisibleCount] = useState(list.length);
    const [isClick, setIsClick] = useState(true);
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
                <h2>Những người bạn có thể biết</h2>
                <Link className="show-all" onClick={handleShowAll}>
                    {isClick ? 'Ẩn bớt' : 'Xem tất cả'}
                </Link>
            </div>
            <div className="show-list">
                {list.slice(0, visibleCount).map((friend) => (
                    <FriendSuggestion key={friend.id} name={friend.name} avata={friend.avata} />
                ))}
            </div>
        </div>
    );
};

export default ListFriendsSuggestion;
