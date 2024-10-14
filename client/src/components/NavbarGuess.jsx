import React from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import bg_white from '../assets/images/bg-white.svg';
import { Link } from 'react-router-dom';

const NavbarGuess = () => {
    return (
        <Wrapper>
            <div className="nav-center">
                <div className="logo">
                    <img className="img-logo" src={bg_white} alt="Logo bg-white" />
                </div>
                <div className="group-right">
                    <ul className="group-auth">
                        <li>
                            <Link to="/login">Log in</Link>
                        </li>
                        <li className="sign-up">
                            <Link to="/sign-up">Sign up</Link>
                        </li>
                    </ul>
                    <div className="language-button">ENG</div>
                </div>
            </div>
        </Wrapper>
    );
};

export default NavbarGuess;
