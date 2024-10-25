import React, { useEffect, useState } from 'react';
import './profile.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Friend from './Friend';
import { listTest } from '../../utils/dataTest';
const ListFriends = ({ linkAPI }) => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');

    const [listFriends, setListFriends] = useState([]);
    const fetchPosts = async () => {
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
        fetchPosts();
    }, [linkAPI]);

    const [visibleCount, setVisibleCount] = useState(9);
    const [isClick, setIsClick] = useState(false);

    const handleShowAll = () => {
        if (!isClick) {
            setVisibleCount(listFriends.length); // Hiển thị tất cả bạn bè
        } else {
            setVisibleCount(9); // Trở lại hiển thị 10 bạn bè
        }
        setIsClick(!isClick); // Đảo ngược trạng thái isClick
    };
    return (
        <div className="list-friends">
            <div className="title">
                <h2>Bạn bè</h2>
                <Link onClick={handleShowAll}>{isClick ? 'Ẩn bớt' : 'Xem tất cả'}</Link>
            </div>
            <div className="title-number-friends">
                <span>{listFriends.length} người bạn</span>
            </div>
            <div className="friends">
                {listFriends.length === 0 ? (
                    <div>Chưa có bạn bè</div>
                ) : (
                    listFriends
                        .slice(0, visibleCount)
                        .map((friend) => <Friend key={friend.requestId} friend={friend} />)
                )}
            </div>
        </div>
    );
};

export default ListFriends;
