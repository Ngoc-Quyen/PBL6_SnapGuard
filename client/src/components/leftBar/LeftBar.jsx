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
                    <Link className="item" to={`/${currentUser.id}`}>
                        <div className="user">
                            <img src={currentUser.avatar_url} alt="" />
                            <span>{currentUser.full_name}</span>
                        </div>
                    </Link>
                    <Link className="item" to={'/'}>
                        <i class="fas fa-home"></i>
                        <p className="item-title">Trang chủ</p>
                    </Link>
                    <Link className="item" to={'/friends'}>
                        <i class="fa-solid fa-user-group"></i>
                        <p className="item-title">Bạn bè</p>
                    </Link>
                    <Link className="item" to={'/chat'}>
                        <i class="fa-brands fa-discourse item-icon"></i>
                        <p className="item-title">Chat</p>
                    </Link>
                    <Link
                        className="item"
                        // onClick={() => {
                        //     logout();
                        // }}
                        to={'/login'}
                    >
                        <i class="fas fa-sign-out-alt"></i>
                        <p className="item-title">Logout</p>
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
