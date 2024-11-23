import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import axios from 'axios';
import { vi } from 'date-fns/locale';
import './chatLeft.scss';

const ItemChat = (props) => {

    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const parsedTime = parseISO(props.user.time);


    useEffect(() => {
        const handleClickOutside = (event) => {
            // Kiểm tra nếu click ra ngoài menu
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside); // Lắng nghe sự kiện click
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Dọn dẹp sự kiện khi component bị hủy
        };
    }, []);

    const handleDeleteChat = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://pbl6-snapguard.onrender.com';

            await axios.delete(`${API_ENDPOINT}/chat/${props.user.id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });

            onDelete(props.user.id); // Gọi callback để cập nhật danh sách bạn chat
        } catch (error) {
            console.error('Error deleting chat:', error);
            alert('Xóa đoạn chat thất bại. Vui lòng thử lại!');
        } finally {
            closeMenu();
        }
    };

    const toggleMenu = (e) => {
        e.preventDefault(); // Ngăn chặn việc nhảy sang link khi bấm nút
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const timeAgo = formatDistanceToNow(parsedTime, {
        addSuffix: true,
        locale: vi,
    });

    return (
        <Link to={`/chat/${props.user.id}`} className="link-item-chat">
            <div className="item-chat">
                <div className="item-avata">
                    <img
                        src={props.user.avatar || 'https://i.imgur.com/q3mEf9u.jpeg'}
                        alt={`${props.user.name || 'Unknown User'} Avatar`}
                    />
                </div>
                <div className="item-info">
                    <h4 className="item-name">{props.user.name}</h4>
                    <div className="item-detail">
                        <p className="item-content">{props.user.content}</p>
                        <span className="time">{timeAgo}</span>
                    </div>
                </div>



            </div>
            <div className="menu-container" ref={menuRef}>
                <button className="menu-toggle" onClick={toggleMenu}>
                    <i className="fas fa-ellipsis-h"></i>
                </button>
                {isMenuOpen && (
                    <div className="modal-menu">
                        <Link className="profile" to={`/profile/${props.user.id}`} onClick={closeMenu}>
                            <i className="far fa-user-circle"></i>
                            Xem trang cá nhân
                        </Link>
                        <div className="remove" onClick={handleDeleteChat}>
                            <i className="far fa-trash-alt"></i>
                            Xóa đoạn chat
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default ItemChat;
