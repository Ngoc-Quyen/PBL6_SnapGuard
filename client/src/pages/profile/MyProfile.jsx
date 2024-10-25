import React, { useContext, useState } from 'react';
import './profile.scss';
import Posts from '../../components/posts/Posts';
import { AuthContext } from '../../context/authContext';
import ModalPost from '../../components/share/ModalPost';
import ModalSetAvata from './ModalSetAvatar';

const MyProfile = () => {
    const { currentUser } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModalAvatar = () => {
        setIsModalOpen(!isModalOpen);
    };
    const closeModalAvatar = () => {
        setIsModalOpen(!isModalOpen);
    };
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
                        <img src={currentUser.avatar_url} alt="" className="profilePic" />
                        <div>
                            <i class="fas fa-camera cameraIcon" onClick={openModalAvatar}></i>
                        </div>
                        {isModalOpen && <ModalSetAvata user={currentUser} onClose={closeModalAvatar} />}
                    </div>
                </div>
                <div className="uInfo">
                    <div className="center">
                        <span>{currentUser.full_name}</span>
                        <div className="number-friends">
                            <span>{currentUser.friendCount}</span>
                        </div>
                    </div>
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
                </div>
                <div className="uContent">
                    <div className="uContent-mota">Hello </div>
                    <div className="uContent-Post">
                        <Posts userId={currentUser.id} linkAPI={`${currentUser.id}/posts`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
