import React from 'react';
import Wrapper from '../assets/wrappers/Navbar';

const NavBarGuess = () => {
    return (
        <Wrapper>
            <div className="nav">
                <div className="logo">
                    <img className="img-logo" src="./Logo_PBL6/bg-white.png" alt="Logo bg-white" />
                </div>
                <div className="group-right">
                    <ul className="group-auth">
                        <li>
                            <a href="#" className="">
                                Sign In
                            </a>
                        </li>
                        <li className="sign-up">
                            <a href="#">Sign Up</a>
                        </li>
                    </ul>
                    <div class="language-button">ENG</div>
                </div>
            </div>
        </Wrapper>
    );
};

export default NavBarGuess;
