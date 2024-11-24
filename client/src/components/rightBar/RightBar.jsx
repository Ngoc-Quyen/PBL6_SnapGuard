import { Link } from 'react-router-dom';
import './rightBar.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RightBar = ({ linkAPI }) => {
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
    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <div className="label">
                        <span>Lời mời kết bạn</span>
                        <Link to={'/friends'}>Xem tất cả</Link>
                    </div>
                    {listFriends.length === 0 ? (
                        <div>Chưa có lời mời kết bạn nào.</div>
                    ) : (
                        listFriends.map((friend) => (
                            <div className="user">
                                <div className="userInfo">
                                    <img src={friend.recipientAvatar} alt="" />
                                    <span>{friend.recipientName}</span>
                                </div>
                                <div className="buttons">
                                    <button>Đồng ý</button>
                                    <button>Xóa</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default RightBar;
