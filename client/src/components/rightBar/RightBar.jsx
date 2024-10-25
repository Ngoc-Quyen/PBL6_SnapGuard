import { Link } from 'react-router-dom';
import './rightBar.scss';

const RightBar = () => {
    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <div className="label">
                        <span>Lời mời kết bạn</span>
                        <Link to={'/friends'}>Xem tất cả</Link>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://i.pinimg.com/736x/89/89/aa/8989aa841c705cd504ac64f448a1c6d5.jpg" alt="" />
                            <span>Hiếu Hiếu</span>
                        </div>
                        <div className="buttons">
                            <button>Đồng ý</button>
                            <button>Xóa</button>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://i.pinimg.com/564x/5a/4d/7c/5a4d7cc2df67478a2e847b1f206f6db0.jpg" alt="" />
                            <span>Phương Phương</span>
                        </div>
                        <div className="buttons">
                            <button>Đồng ý</button>
                            <button>Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightBar;
