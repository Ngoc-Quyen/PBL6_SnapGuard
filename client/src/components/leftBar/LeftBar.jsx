import './leftBar.scss';

import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const LeftBar = () => {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <div className="leftBar">
            <div className="">
                <ul>
                    <Link
                        className={`item ${window.location.pathname === `/${currentUser.id}` ? 'active' : ''}`}
                        to={`/${currentUser.id}`}
                    >
                        <div className="user">
                            <img src={currentUser.avatar_url} alt="" />
                            <span>{currentUser.full_name}</span>
                        </div>
                    </Link>
                    <Link
                        className={`item ${window.location.pathname === '/' ? 'active' : ''}`}
                        to={'/'}
                        onClick={() => window.location.reload()}
                    >
                        <i class="fas fa-home"></i>
                        <p className="item-title">Trang chủ</p>
                    </Link>
                    <Link className={`item ${window.location.pathname === '/friends' ? 'active' : ''}`} to={'/friends'}>
                        <i class="fa-solid fa-user-group"></i>
                        <p className="item-title">Bạn bè</p>
                    </Link>
                    <Link className={`item ${window.location.pathname === '/chat' ? 'active' : ''}`} to={'/chat'}>
                        <i class="fa-brands fa-discourse item-icon"></i>
                        <p className="item-title">Chat</p>
                    </Link>
                    <Link
                        className="item"
                        onClick={() => {
                            logout();
                        }}
                        to={'/login'}
                    >
                        <i class="fas fa-sign-out-alt"></i>
                        <p className="item-title">Đăng xuất</p>
                    </Link>
                </ul>
            </div>
            <div className="footer">
                Social Network - SnapGuard
                <p className="footer-local">DHBK@2024</p>
            </div>
        </div>
    );
};

export default LeftBar;
