import './navbar.scss';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { useContext, useState, useRef } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import bg_green_tree from '../../assets/images/bg-matcha-pastel.svg';
import bg_green_black from '../../assets/images/bg-green-black.svg';
import ChatLeft from '../../pages/chat/ChatLeft';
import Notification from '../notification/Notification';
import SearchHome from '../../pages/search/SearchHome';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Navbar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const chatRef = useRef();
    const notificationRef = useRef();

    useOnClickOutside(chatRef, () => setIsChatOpen(false));
    useOnClickOutside(notificationRef, () => setIsNotificationOpen(false));

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowSearchResults(e.target.value.length > 0);
    };

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

    const handleClearSearch = () => {
        setSearchQuery('');
        setShowSearchResults(false);
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
                <input
                    type="text"
                    placeholder="Tìm kiếm bạn bè..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                    onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                />

                {searchQuery && (
                    <button className="clear-search" onClick={handleClearSearch}>
                        <i className="fas fa-times"></i>
                    </button>
                )}
                {showSearchResults && (
                    <SearchHome query={searchQuery} />
                )}
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
                <div className="show-chat" ref={chatRef}>
                    <ChatLeft />
                </div>
            )}

            {isNotificationOpen && (
                <div className="show-chat" ref={notificationRef}>
                    <Notification />
                </div>
            )}
        </div>
    );
};

export default Navbar;
