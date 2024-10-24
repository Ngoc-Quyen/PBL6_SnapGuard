import React from 'react';
import Wrapper from '../assets/wrappers/Sidebar';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Wrapper>
            <div className="">
                <ul>
                    <Link className="item">
                        <i class="fas fa-user item-icon"></i>
                        <p className="item-title">Profile</p>
                    </Link>
                    <Link className="item">
                        <i class="fa-solid fa-house item-icon"></i>
                        <p className="item-title">Community</p>
                    </Link>
                    <Link className="item">
                        <i class="fa-brands fa-discourse item-icon"></i>
                        <p className="item-title">Discover</p>
                    </Link>
                </ul>
            </div>
            <div className="footer">
                Social Network - SnapGuard
                <p className="footer-local">DHBK@2024</p>
            </div>
        </Wrapper>
    );
};

export default Sidebar;
