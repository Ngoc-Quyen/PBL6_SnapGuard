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
    const acceptFriend = async (senderId) => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/friend/accept/${senderId}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            return true;
        } catch (error) {
            console.log('🚀 ~ acceptFriend ~ error:', error);
        }
    };
    const rejectFriend = async (senderId) => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/friend/reject/${senderId}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            return true;
        } catch (error) {
            console.log('🚀 ~ rejectFriend ~ error:', error);
        }
    };
    const handleAccept = async (senderId) => {
        if (acceptFriend(senderId)) {
            console.log('Lời mời kết bạn đã được chấp nhận');
            fetchPosts();
        } else {
            alert('Request không thành công');
        }
    };
    const handleReject = async (senderId) => {
        if (rejectFriend(senderId)) {
            console.log('Lời mời kết bạn bị từ chối');
            fetchPosts();
        } else {
            alert('Request không thành công');
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
                                    <Link to={`/${friend.senderId}`} className="userInfo-img">
                                        <img src={friend.senderAvatar} alt="" />
                                    </Link>
                                    <Link to={`/${friend.senderId}`} className="userInfo-name">
                                        {friend.senderName}
                                    </Link>
                                </div>
                                <div className="buttons">
                                    <button
                                        onClick={() => {
                                            handleAccept(friend.requestId);
                                        }}
                                    >
                                        Đồng ý
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleReject(friend.requestId);
                                        }}
                                    >
                                        Xóa
                                    </button>
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
