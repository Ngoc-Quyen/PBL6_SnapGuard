import React, { useEffect, useState } from 'react';
import './friend.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FriendRequestOut from './FriendRequestGoOut';
const ListFriendsRequestOut = ({ linkAPI }) => {
    const [visibleCount, setVisibleCount] = useState(5);
    const [isClick, setIsClick] = useState(false);

    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');

    const [listFriends, setListFriends] = useState([]);
    const fetchFriends = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/${linkAPI}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            setListFriends(response.data); // Assume response.data contains the posts array
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    //TEMPORARY
    useEffect(() => {
        fetchFriends();
    }, [linkAPI]);

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 5); // Tăng thêm 2 bạn bè mỗi lần nhấn "Xem thêm"
    };
    const handleShowAll = () => {
        if (!isClick) {
            setVisibleCount(listFriends.length); // Hiển thị tất cả bạn bè
        } else {
            setVisibleCount(10); // Trở lại hiển thị 10 bạn bè
        }
        setIsClick(!isClick); // Đảo ngược trạng thái isClick
    };
    return (
        <div className="friends">
            <div className="title">
                <h2>Gửi lời mời </h2>
                <Link className="show-all" onClick={handleShowAll}>
                    {isClick ? 'Ẩn bớt' : 'Xem tất cả'}
                </Link>
            </div>
            <div className="show-list">
                {listFriends.slice(0, visibleCount).map((friend) => (
                    <FriendRequestOut
                        key={friend.requestId}
                        friend={friend}
                        reload={() => {
                            fetchFriends();
                        }}
                    />
                ))}
            </div>

            <div style={{ borderBottom: '2px solid rgb(179, 177, 177)', margin: '20px 0px' }}>
                {visibleCount < listFriends.length && ( // Hiển thị nút "Xem thêm" chỉ khi còn bạn bè để hiển thị
                    <div className="more" onClick={handleShowMore}>
                        <p className="more-title">Xem thêm</p>
                        <i className="fas fa-sort-down"></i>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListFriendsRequestOut;
