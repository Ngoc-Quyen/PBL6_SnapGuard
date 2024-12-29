import './navbar.scss';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import bg_green_tree from '../../assets/images/bg-matcha-pastel.svg';
import bg_green_black from '../../assets/images/bg-green-black.svg';
import ChatLeft from '../../pages/chat/ChatLeft';
import Notification from '../notification/Notification';
import SearchHome from '../../pages/search/SearchHome';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { realTime } from '../../utils/calculateTimeDifference ';
import axios from 'axios';

const Navbar = () => {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const storedToken = localStorage.getItem('token');

    const [listNotifineNoRead, setListNotifineNoRead] = useState([]);

    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const chatRef = useRef();
    const notificationRef = useRef();
    const realDateTime = realTime();
    const [numberNotifine, setNumberNotifine] = useState(0);

    useOnClickOutside(chatRef, () => setIsChatOpen(false));
    useOnClickOutside(notificationRef, () => setIsNotificationOpen(false));

    const handleListNotifine = async () => {
        try {
            const result = await axios.get(`${API_ENDPOINT}/notification`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            const listNotifine = result.data;
            const unReadNotifine = listNotifine.filter((notifine) => notifine.is_read === false);
            setListNotifineNoRead(unReadNotifine);
        } catch (error) {
            console.log('🚀 ~ listNotifine ~ error:', error);
        }
    };

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
    const handleNumberNotifine = async () => {
        handleListNotifine();
        setNumberNotifine(listNotifineNoRead.length);
    };
    useEffect(() => {
        handleNumberNotifine();
    }, [realDateTime]);
    return (
        <div className="navbar">
            <div className="left">
                <Link
                    to="/"
                    style={{ textDecoration: 'none', width: '120px', height: 'auto' }}
                    onClick={() => window.location.reload()}
                >
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
                {showSearchResults && <SearchHome query={searchQuery} />}
            </div>
            <div className="right">
                <div className="btn-icon btn-chat" onClick={handleToggleChat}>
                    <i class="fab fa-facebook-messenger"></i>
                </div>
                <div className="btn-icon btn-notification btn" onClick={handleToggleNotification}>
                    <i class="far fa-bell"></i>
                    {numberNotifine > 0 && (
                        <div className="number-notifine">
                            <span>{numberNotifine}</span>
                        </div>
                    )}
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
                    <Notification setNumberNotifine={setNumberNotifine} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
