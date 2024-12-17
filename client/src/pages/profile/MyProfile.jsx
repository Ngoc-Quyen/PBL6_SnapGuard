import React, { useContext, useEffect, useState } from 'react';
import './profile.scss';
import Posts from '../../components/posts/Posts';
import { AuthContext } from '../../context/authContext';
import ModalSetAvata from './ModalSetAvatar';
import Share from '../../components/share/Share';
import axios from 'axios';
import LeftMyProfile from './LeftMyProfile';
import ListFriends from './ListFriends';
import { Link, useParams } from 'react-router-dom';
import LeftProfile from './LeftProfile';
import { statusRelationship } from '../../utils/status';

const MyProfile = () => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');
    const { currentUser } = useContext(AuthContext);
    const { id } = useParams();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshPosts, setRefreshPosts] = useState(false);
    const [userProfile, setUserProfile] = useState([]);
    const [listFriends, setListFriends] = useState([]);
    const [isStatus, setIsStatus] = useState('');
    const openModalAvatar = () => {
        setIsModalOpen(!isModalOpen);
    };
    const closeModalAvatar = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handlePostCreated = () => {
        // Khi tạo bài viết thành công, sẽ gọi hàm này để reload lại dữ liệu bài viết
        setRefreshPosts(!refreshPosts);
    };
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/user/${id}/profile`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            setUserProfile(response.data.user); // Assume response.data contains the posts array
        } catch (error) {
            console.error('Error fetching User profile:', error);
        }
    };
    const fetchListFriends = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/friend/list/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            setListFriends(response.data);
        } catch (error) {
            console.error('Error fetching list friend:', error);
        }
    };
    const postRequestFriend = async (id) => {
        try {
            const response = await axios.post(
                `${API_ENDPOINT}/friend/request`,
                {
                    friendId: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
            );
            setIsStatus(response.data.status);
        } catch (error) {
            console.log('🚀 ~ postRequestFriend ~ error:', error);
        }
    };
    const cancelRequestFriend = async (senderId) => {
        try {
            const response = await axios.delete(
                `${API_ENDPOINT}/friend/cancel/${senderId}`,
                {}, // Body rỗng
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
            );
            return true;
        } catch (error) {
            console.error('🚀 ~ cancelFriend ~ error:', error);
            return false; // Trả về false nếu có lỗi
        }
    };
    const handleAddFriends = async () => {
        postRequestFriend(id);
        fetchUserProfile();
    };
    const handleCancelFriends = async (id) => {
        const result = await cancelRequestFriend(id);
        if (result) {
            setIsStatus('');
            fetchUserProfile();
        } else {
            alert('Cancel khong thanh cong');
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
            return false;
        }
    };
    const handleAccept = async (senderId) => {
        if (await acceptFriend(senderId)) {
            console.log('Lời mời kết bạn đã được chấp nhận');
            fetchUserProfile();
        } else {
            alert('Request không thành công');
        }
    };
    useEffect(() => {
        fetchUserProfile();
        fetchListFriends();
    }, [id]);
    return (
        <div className="profile">
            <div className="profileContainer">
                <div className="images">
                    <img
                        src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt=""
                        className="cover"
                    />
                    <div className="avatar">
                        <img src={userProfile.avatar_url} alt="" className="profilePic" />
                        {id === currentUser.id && (
                            <div>
                                <i class="fas fa-camera cameraIcon" onClick={openModalAvatar}></i>
                            </div>
                        )}

                        {isModalOpen && <ModalSetAvata user={userProfile} onClose={closeModalAvatar} />}
                    </div>
                </div>
                <div className="uInfo">
                    <div className="center">
                        <span>{userProfile.full_name}</span>
                        <div className="number-friends">
                            <span>{userProfile.friendCount} người bạn</span>
                        </div>
                    </div>
                    {id === currentUser.id ? (
                        <div className="right">
                            <div className="btn">
                                <button className="btn-chat">
                                    <i class="fas fa-plus mr-6 mb-2"></i>
                                    Thêm vào tin
                                </button>
                                <button className="btn-friend">
                                    <i class="fas fa-pen mr-6 mb-2"></i>
                                    Chỉnh sửa trang cá nhân
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="right">
                            <div className="btn">
                                {userProfile.relationshipStatus === statusRelationship.Accepted && (
                                    <>
                                        <button className="btn-friend">
                                            <i class="fas fa-user-check mr-6 mb-2"></i>
                                            Bạn bè
                                        </button>
                                        <Link to={`/chat/${userProfile.id}`} className="btn-chat">
                                            <i class="fab fa-facebook-messenger mr-6 mb-2"></i>
                                            <span>Nhắn tin</span>
                                        </Link>
                                    </>
                                )}
                                {userProfile.relationshipStatus === statusRelationship.Pending && (
                                    <>
                                        <div
                                            className="btn-request"
                                            onClick={() => {
                                                handleCancelFriends(id);
                                            }}
                                        >
                                            <i class="fas fa-user-times mr-6 mb-2"></i>
                                            Hủy lời mời
                                        </div>
                                        <Link to={`/chat/${userProfile.id}`} className="btn-chat non-friend">
                                            <i class="fab fa-facebook-messenger mr-6 mb-2"></i>
                                            <span>Nhắn tin</span>
                                        </Link>
                                    </>
                                )}
                                {userProfile.relationshipStatus === statusRelationship.Pending_by_target && (
                                    <>
                                        <div
                                            className="btn-request"
                                            onClick={() => {
                                                handleAccept(id);
                                            }}
                                        >
                                            <i class="fas fa-user-check mr-6 mb-2"></i>
                                            Chấp nhận lời mời
                                        </div>
                                        <Link to={`/chat/${userProfile.id}`} className="btn-chat non-friend">
                                            <i class="fab fa-facebook-messenger mr-6 mb-2"></i>
                                            <span>Nhắn tin</span>
                                        </Link>
                                    </>
                                )}
                                {userProfile.relationshipStatus === statusRelationship.Stranger && (
                                    <>
                                        {isStatus === 'pending' ? (
                                            <div
                                                className="btn-request"
                                                onClick={() => {
                                                    handleCancelFriends(id);
                                                }}
                                            >
                                                <i class="fas fa-user-times mr-6 mb-2"></i>
                                                Hủy lời mời
                                            </div>
                                        ) : (
                                            <div
                                                className="btn-addFriend"
                                                onClick={() => {
                                                    handleAddFriends(id);
                                                }}
                                            >
                                                <i class="fas fa-user-plus mr-6 mb-2"></i>
                                                Thêm bạn bè
                                            </div>
                                        )}
                                        <Link to={`/chat/${userProfile.id}`} className="btn-chat non-friend">
                                            <i class="fab fa-facebook-messenger mr-6 mb-2"></i>
                                            <span>Nhắn tin</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {id === currentUser.id && <Share onPostCreated={handlePostCreated} />}
                <div className="uContent">
                    <div className="uContent-mota">
                        {id === currentUser.id ? (
                            <LeftMyProfile userProfile={userProfile} />
                        ) : (
                            <LeftProfile userProfile={userProfile} />
                        )}
                        <ListFriends linkAPI={`friend/list/${id}`} />
                    </div>
                    <div className="uContent-Post">
                        <Posts userId={userProfile.id} linkAPI={`${userProfile.id}/posts`} refresh={refreshPosts} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
