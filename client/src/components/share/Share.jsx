import './share.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import ModalPost from './ModalPost';
import useClickOutSide from '../../hooks/useClickOutSide';

const Share = () => {
    const { currentUser } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { show, setShow, nodeRef } = useClickOutSide();

    const openModal = () => {
        setIsModalOpen(!isModalOpen);
        setShow(!show);
    };
    const closeModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };
    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left" ref={nodeRef}>
                        <div className="avata">
                            <img src={currentUser.avatar_url} alt="" />
                        </div>
                        <div class="modal-input" onClick={openModal}>
                            <span>{currentUser.full_name} ơi, bạn đang nghĩ gì thế?</span>
                        </div>
                        {isModalOpen && (
                            <ModalPost
                                src={currentUser.avatar_url}
                                userName={currentUser.full_name}
                                onClose={closeModal}
                            />
                        )}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <label htmlFor="">
                            <div className="item" onClick={openModal}>
                                <i class="fa-regular fa-image"></i>
                                <span style={{ fontSize: '15px' }}>Ảnh</span>
                            </div>
                        </label>
                        <div className="item" onClick={openModal}>
                            <i class="fa-solid fa-map-location-dot"></i>
                            <span style={{ fontSize: '15px' }}>Check in</span>
                        </div>
                        <div className="item" onClick={openModal}>
                            <i class="fa-regular fa-face-laugh-beam"></i>
                            <span style={{ fontSize: '15px' }}>Cảm xúc/Hoạt động</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
