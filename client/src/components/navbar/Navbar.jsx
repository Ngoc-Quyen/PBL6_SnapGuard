import './navbar.scss';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import bg_green_tree from '../../assets/images/bg-matcha-pastel.svg';
import bg_green_black from '../../assets/images/bg-green-black.svg';
import ChatLeft from '../../pages/chat/ChatLeft';
import Notification from '../notification/Notification';

const Navbar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleToggleChat = () => {
        if (isNotificationOpen) {
            setIsNotificationOpen(false); // Đóng thông báo nếu đang mở
        }
        setIsChatOpen((prevState) => !prevState); // Toggle chat
    };

    const handleToggleNotification = () => {
        if (isChatOpen) {
            setIsChatOpen(false); // Đóng chat nếu đang mở
        }
        setIsNotificationOpen((prevState) => !prevState); // Toggle notification
    };
    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: 'none', width: '120px', height: 'auto' }}>
                    <img className="img-logo" src={darkMode ? bg_green_black : bg_green_tree} alt="Logo" />
                </Link>
                {darkMode ? <WbSunnyOutlinedIcon onClick={toggle} /> : <DarkModeOutlinedIcon onClick={toggle} />}
            </div>
            <div className="search">
                <SearchOutlinedIcon />
                <input type="text" placeholder="Search..." />
            </div>
            <div className="right">
                <div className="btn-icon btn-chat" onClick={handleToggleChat}>
                    <i class="fab fa-facebook-messenger"></i>
                </div>
                <div className="btn-icon btn-notification" onClick={handleToggleNotification}>
                    <i class="far fa-bell"></i>
                </div>

                <Link className="user" to={`/${currentUser.id}`}>
                    <img src={currentUser.avatar_url} alt="" />
                    <span>{currentUser.full_name}</span>
                </Link>
            </div>

            {isChatOpen && (
                <div className="show-chat">
                    <ChatLeft />
                </div>
            )}

            {isNotificationOpen && (
                <div className="show-chat">
                    <Notification />
                </div>
            )}
        </div>
    );
};

export default Navbar;
