import React, { useEffect, useState } from 'react';
import FriendSuggestion from './FriendSuggestion';
import './friend.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
const ListFriendsSuggestion = ({ linkAPI }) => {
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

    const [visibleCount, setVisibleCount] = useState(listFriends.length);
    const [isClick, setIsClick] = useState(false);
    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 5); // Tăng thêm 2 bạn bè mỗi lần nhấn "Xem thêm"
    };
    const handleShowAll = () => {
        if (!isClick) {
            setVisibleCount(listFriends.length); // Hiển thị tất cả bạn bè
        } else {
            setVisibleCount(5); // Trở lại hiển thị 10 bạn bè
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
                {listFriends.slice(0, visibleCount).map((friend) => (
                    <FriendSuggestion key={friend.potentialFriend.id} friend={friend.potentialFriend} />
                ))}
            </div>
        </div>
    );
};

export default ListFriendsSuggestion;
