import React, { useState } from 'react';
import '../assets/css/LoginModal.css'; // Di chuyển phần CSS vào file riêng hoặc chỉnh sửa theo dự án
import Wrapper from '../assets/wrappers/LoginModal';

function LoginModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOutsideClick = (event) => {
        if (event.target.className === 'modal') {
            handleCloseModal();
        }
    };

    return (
        <Wrapper>
            <button onClick={handleOpenModal} style={{ width: 'auto' }}>
                Login
            </button>

            {isModalOpen && (
                <div id="id01" className="modal" onClick={handleOutsideClick}>
                    <form className="modal-content animate">
                        <div className="imgcontainer">
                            <span onClick={handleCloseModal} className="close" title="Close Modal">
                                &times;
                            </span>
                            <img src="img_avatar2.png" alt="Avatar" className="avatar" />
                        </div>

                        <div className="container">
                            <label htmlFor="uname">
                                <b>Username</b>
                            </label>
                            <input type="text" placeholder="Enter Username" name="uname" required />

                            <label htmlFor="psw">
                                <b>Password</b>
                            </label>
                            <input type="password" placeholder="Enter Password" name="psw" required />

                            <button type="submit">Login</button>
                            <label>
                                <input type="checkbox" name="remember" defaultChecked /> Remember me
                            </label>
                        </div>

                        <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
                            <button type="button" onClick={handleCloseModal} className="cancelbtn">
                                Cancel
                            </button>
                            <span className="psw">
                                Forgot <a href="#">password?</a>
                            </span>
                        </div>
                    </form>
                </div>
            )}
        </Wrapper>
    );
}

export default LoginModal;
