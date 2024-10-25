import './profile.scss';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import Posts from '../../components/posts/Posts';

const Profile = () => {
    return (
        <div className="profile">
            <div className="profileContainer">
                <div className="images">
                    <img
                        src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt=""
                        className="cover"
                    />
                    <div className="avatar">
                        <img
                            src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt=""
                            className="profilePic"
                        />
                    </div>
                </div>
                <div className="uInfo">
                    <div className="left"></div>
                    <div className="center">
                        <span>Quyên Quyên</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon />
                                <span>Vietnamese</span>
                            </div>
                            <div className="item">
                                <LanguageIcon />
                                <span>devReact.dev</span>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="btn">
                            <button className="btn-friend">
                                <i class="fas fa-user-check mr-6 mb-2"></i>
                                Bạn bè
                            </button>
                            <button className="btn-chat">
                                <i class="fab fa-facebook-messenger mr-6 mb-2"></i>
                                Nhắn tin
                            </button>
                        </div>
                    </div>
                </div>
                <Posts />
            </div>
        </div>
    );
};

export default Profile;
