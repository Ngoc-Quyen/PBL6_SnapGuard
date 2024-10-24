import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavbarGuess from '../../components/NavbarGuess';
import Wrapper from '../../assets/wrappers/Login';

const LogIn = () => {
    return (
        <Wrapper>
            <form action="POST" className="form-login">
                <h1 className="title">Log In</h1>
                <div className="form-submit">
                    <div className="form-item">
                        <div className="item-label">
                            <i className="fa-solid fa-envelope"></i>
                            <label htmlFor="email" style={{ fontWeight: 600 }}>
                                Email
                            </label>
                        </div>
                        <div className="item-input">
                            <input type="email" name="email" id="email" placeholder="name@gmail.com" />
                        </div>
                    </div>
                    <div className="form-item">
                        <div className="item-label">
                            <i class="fa-solid fa-lock"></i>
                            <label htmlFor="password" style={{ fontWeight: 600 }}>
                                Password
                            </label>
                        </div>
                        <div className="item-input">
                            <input type="password" name="password" id="password" placeholder="your password" />
                        </div>
                    </div>
                    <button type="submit">Login</button>
                    <div className="footer">
                        <Link className="btn-cancel" to={'/'}>
                            Cancel
                        </Link>
                        <div className="forgot-password">
                            Forgot
                            <Link>Password</Link>
                        </div>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default LogIn;
