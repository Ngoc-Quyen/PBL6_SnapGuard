import React from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import bg_green_tree from '../assets/images/bg-green-tree.svg';
import { Link } from 'react-router-dom';
import avata from '../assets/images/HIEUTHUHAI.jpg';

const NavbarUser = () => {
    return (
        <Wrapper>
            <div className="nav-center bg-primary ">
                <div className="logo">
                    <img className="img-logo" src={bg_green_tree} alt="Logo bg-green-tree" />
                </div>

                <div className="search">
                    <input type="text" className="search-input" placeholder="Search ..." />
                    <Link className="search-icon bg-orange" to="/">
                        <i class="fas fa-search"></i>
                    </Link>
                </div>
                <div className="group-right-profile">
                    <div>
                        <Link>
                            <i class="fab fa-facebook-messenger font-size-25 text-white"></i>
                        </Link>
                    </div>
                    <div>
                        <Link to="/">
                            <i class="fas fa-bell font-size-25 text-white"></i>
                        </Link>
                    </div>
                    <div className="profile">
                        <Link to="/">
                            <img src={avata} alt="" className="avata-img" />
                        </Link>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default NavbarUser;
